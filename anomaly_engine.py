#!/usr/bin/env python3
"""
Anomaly Detection Engine
Detects anomalies in weather readings using Z-score and Isolation Forest algorithms
"""

import os
import psycopg2
import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()

class AnomalyDetectionEngine:
    def __init__(self):
        """Initialize database connection and parameters"""
        self.conn = None
        self.cursor = None
        self.scaler = StandardScaler()
        self.isolation_forest_models = {}  # One model per location
        
    def connect_db(self):
        """Connect to PostgreSQL database"""
        try:
            self.conn = psycopg2.connect(
                host=os.getenv('DB_HOST'),
                database=os.getenv('DB_NAME'),
                user=os.getenv('DB_USER'),
                password=os.getenv('DB_PASSWORD'),
                port=os.getenv('DB_PORT', 5432)
            )
            self.cursor = self.conn.cursor()
            print("✓ Database connection established")
        except Exception as e:
            print(f"✗ Database connection failed: {e}")
            raise
    
    def close_db(self):
        """Close database connection"""
        if self.cursor:
            self.cursor.close()
        if self.conn:
            self.conn.close()
    
    def load_weather_data(self, days_back=30):
        """Load weather data from database for the last N days"""
        query = """
        SELECT reading_id, location_id, location_geom, temp, pressure, humidity, 
               created_at
        FROM weather_readings
        WHERE created_at >= NOW() - INTERVAL '%s days'
        ORDER BY location_id, created_at
        """
        try:
            df = pd.read_sql_query(
                query % days_back,
                self.conn,
                parse_dates=['created_at']
            )
            print(f"✓ Loaded {len(df)} weather readings")
            return df
        except Exception as e:
            print(f"✗ Failed to load weather data: {e}")
            return None
    
    def calculate_zscore_anomalies(self, df):
        """
        Week 1: Detect anomalies using Z-score baseline
        Flags readings where |z| > 2.5
        """
        df['z_score_temp'] = np.abs((df['temp'] - df.groupby('location_id')['temp'].transform('mean')) / 
                                     df.groupby('location_id')['temp'].transform('std'))
        df['z_score_pressure'] = np.abs((df['pressure'] - df.groupby('location_id')['pressure'].transform('mean')) / 
                                         df.groupby('location_id')['pressure'].transform('std'))
        df['z_score_humidity'] = np.abs((df['humidity'] - df.groupby('location_id')['humidity'].transform('mean')) / 
                                         df.groupby('location_id')['humidity'].transform('std'))
        
        # Flag if any metric exceeds Z-score threshold
        threshold = 2.5
        df['is_anomaly_zscore'] = (
            (df['z_score_temp'] > threshold) |
            (df['z_score_pressure'] > threshold) |
            (df['z_score_humidity'] > threshold)
        )
        df['anomaly_score_zscore'] = df[['z_score_temp', 'z_score_pressure', 'z_score_humidity']].max(axis=1)
        
        print(f"✓ Z-score analysis complete. Anomalies found: {df['is_anomaly_zscore'].sum()}")
        return df
    
    def train_isolation_forest(self, df):
        """
        Week 2-3: Train Isolation Forest models per location
        Returns dict of trained models
        """
        features = ['temp', 'pressure', 'humidity']
        models = {}
        
        for location_id in df['location_id'].unique():
            location_data = df[df['location_id'] == location_id][features]
            
            if len(location_data) > 10:  # Need minimum samples
                model = IsolationForest(contamination=0.1, random_state=42)
                model.fit(location_data)
                models[location_id] = model
        
        print(f"✓ Isolation Forest models trained for {len(models)} locations")
        return models
    
    def calculate_isolation_forest_anomalies(self, df, models):
        """
        Detect anomalies using Isolation Forest
        Returns anomaly scores between -1 (anomaly) and 1 (normal)
        """
        features = ['temp', 'pressure', 'humidity']
        df['anomaly_score_isolationforest'] = 0.0
        df['is_anomaly_isolationforest'] = False
        
        for location_id in df['location_id'].unique():
            mask = df['location_id'] == location_id
            
            if location_id in models:
                location_data = df.loc[mask, features]
                scores = models[location_id].decision_function(location_data)
                df.loc[mask, 'anomaly_score_isolationforest'] = scores
                # Isolation Forest returns negative scores for anomalies
                df.loc[mask, 'is_anomaly_isolationforest'] = scores < -0.5
        
        print(f"✓ Isolation Forest analysis complete. Anomalies found: {df['is_anomaly_isolationforest'].sum()}")
        return df
    
    def write_anomaly_scores(self, df):
        """
        Week 4: Write anomaly detection results back to database
        """
        try:
            insert_query = """
            INSERT INTO anomaly_scores (reading_id, anomaly_score_zscore, is_anomaly_zscore,
                                        anomaly_score_isolationforest, is_anomaly_isolationforest,
                                        severity, detected_at)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (reading_id) DO UPDATE SET
                anomaly_score_zscore = EXCLUDED.anomaly_score_zscore,
                is_anomaly_zscore = EXCLUDED.is_anomaly_zscore,
                anomaly_score_isolationforest = EXCLUDED.anomaly_score_isolationforest,
                is_anomaly_isolationforest = EXCLUDED.is_anomaly_isolationforest,
                severity = EXCLUDED.severity,
                detected_at = EXCLUDED.detected_at;
            """
            
            for _, row in df.iterrows():
                # Determine severity based on anomaly scores
                severity = 'normal'
                if row['is_anomaly_isolationforest'] or row['is_anomaly_zscore']:
                    if row.get('anomaly_score_isolationforest', 0) < -0.7 or row.get('anomaly_score_zscore', 0) > 3.0:
                        severity = 'critical'
                    else:
                        severity = 'warning'
                
                self.cursor.execute(insert_query, (
                    row['reading_id'],
                    float(row.get('anomaly_score_zscore', 0)),
                    bool(row.get('is_anomaly_zscore', False)),
                    float(row.get('anomaly_score_isolationforest', 0)),
                    bool(row.get('is_anomaly_isolationforest', False)),
                    severity,
                    datetime.now()
                ))
            
            self.conn.commit()
            print(f"✓ Written {len(df)} anomaly scores to database")
        except Exception as e:
            print(f"✗ Failed to write anomaly scores: {e}")
            self.conn.rollback()
    
    def run(self):
        """Execute the anomaly detection pipeline"""
        try:
            self.connect_db()
            
            # Load data
            df = self.load_weather_data(days_back=30)
            if df is None or len(df) == 0:
                print("No data to process")
                return
            
            # Week 1: Z-score analysis
            df = self.calculate_zscore_anomalies(df)
            
            # Week 2-3: Isolation Forest analysis
            models = self.train_isolation_forest(df)
            df = self.calculate_isolation_forest_anomalies(df, models)
            
            # Week 4: Write results
            self.write_anomaly_scores(df)
            
            print("✓ Anomaly detection pipeline completed successfully")
        
        except Exception as e:
            print(f"✗ Pipeline failed: {e}")
        
        finally:
            self.close_db()


if __name__ == "__main__":
    engine = AnomalyDetectionEngine()
    engine.run()
