#!/usr/bin/env python3
"""
Database schema initialization for Vaayu anomaly detection system
"""

import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def init_database():
    """Create database tables for weather readings and anomaly scores"""
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT', 5432)
    )
    cursor = conn.cursor()
    
    try:
        # Drop existing tables if they exist
        cursor.execute("DROP TABLE IF EXISTS anomaly_scores CASCADE;")
        cursor.execute("DROP TABLE IF EXISTS weather_readings CASCADE;")
        
        # Create weather_readings table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS weather_readings (
            reading_id SERIAL PRIMARY KEY,
            location_id INTEGER NOT NULL,
            location_geom POINT,
            temp FLOAT NOT NULL,
            pressure FLOAT NOT NULL,
            humidity FLOAT NOT NULL,
            wind_speed FLOAT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """)
        
        # Create anomaly_scores table
        cursor.execute("""
        CREATE TABLE IF NOT EXISTS anomaly_scores (
            score_id SERIAL PRIMARY KEY,
            reading_id INTEGER UNIQUE NOT NULL REFERENCES weather_readings(reading_id) ON DELETE CASCADE,
            anomaly_score_zscore FLOAT,
            is_anomaly_zscore BOOLEAN DEFAULT FALSE,
            anomaly_score_isolationforest FLOAT,
            is_anomaly_isolationforest BOOLEAN DEFAULT FALSE,
            severity VARCHAR(20) DEFAULT 'normal',
            detected_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            acknowledged BOOLEAN DEFAULT FALSE,
            FOREIGN KEY (reading_id) REFERENCES weather_readings(reading_id)
        );
        """)
        
        # Create indices for performance
        cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_weather_location_time 
        ON weather_readings(location_id, created_at DESC);
        """)
        
        cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_anomaly_severity 
        ON anomaly_scores(severity, detected_at DESC);
        """)
        
        cursor.execute("""
        CREATE INDEX IF NOT EXISTS idx_anomaly_reading_id 
        ON anomaly_scores(reading_id);
        """)
        
        conn.commit()
        print("✓ Database schema initialized successfully")
    
    except Exception as e:
        print(f"✗ Database initialization failed: {e}")
        conn.rollback()
    
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    init_database()
