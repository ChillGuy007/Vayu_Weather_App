import os
import psycopg2
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from dotenv import load_dotenv
import requests

load_dotenv()

conn = psycopg2.connect(os.getenv("DATABASE_URL"))

# 1. Load data
query = "SELECT id, location, lat, lon, temperature, humidity, pressure, wind_speed, precipitation, recorded_at FROM weather_readings"
df = pd.read_sql(query, conn)

if df.empty:
    print("No data found")
    exit()

# 2. Z-SCORE METHOD
def compute_zscore(group):
    group = group.sort_values("recorded_at")

    for col in ["temperature", "humidity", "pressure", "wind_speed", "precipitation"]:
        rolling_mean = group[col].rolling(window=30, min_periods=5).mean()
        rolling_std = group[col].rolling(window=30, min_periods=5).std()

        group[f"{col}_z"] = (group[col] - rolling_mean) / rolling_std

    return group

df = df.groupby("location").apply(compute_zscore)

# Combine z-scores
df["z_score"] = df[[col for col in df.columns if "_z" in col]].abs().max(axis=1)

# 3. ISOLATION FOREST
features = df[["temperature", "humidity", "pressure", "wind_speed", "precipitation"]].fillna(0)

model = IsolationForest(contamination=0.05, random_state=42)
df["iso_score"] = model.fit_predict(features)  # -1 = anomaly

# Convert to usable score
df["iso_score"] = df["iso_score"].apply(lambda x: 1 if x == -1 else 0)

# 4. FINAL SCORE
df["final_score"] = df["z_score"] + df["iso_score"]

# 5. SEVERITY CLASSIFICATION
def get_severity(score):
    if score > 4:
        return "critical"
    elif score > 2.5:
        return "warning"
    else:
        return "normal"

df["severity"] = df["final_score"].apply(get_severity)

# 6. Insert into DB
cursor = conn.cursor()

for _, row in df.iterrows():
    cursor.execute("""
        INSERT INTO anomaly_scores (reading_id, location, score, severity)
        VALUES (%s, %s, %s, %s)
    """, (
        int(row["id"]),
        row["location"],
        float(row["final_score"]),
        row["severity"]
    ))

    if row["severity"] == "critical":
        try:
            requests.post("http://localhost:5000/api/anomalies/trigger", json={
                "lat": float(row["lat"]),
                "lon": float(row["lon"]),
                "severity": row["severity"],
                "score": float(row["final_score"])
            })
        except requests.exceptions.RequestException as e:
            print(f"Failed to send alert: {e}")

conn.commit()
cursor.close()
conn.close()

print("✅ Anomaly detection completed")