#!/usr/bin/env python3
"""
Load weather data from OpenWeatherMap API into the database
"""

import os
import psycopg2
import requests
from dotenv import load_dotenv
from datetime import datetime

load_dotenv()

OPENWEATHER_API_KEY = os.getenv('OPENWEATHERMAP_API_KEY')
OPENWEATHER_URL = "https://api.openweathermap.org/data/2.5/weather"

# Example locations (lat, lon, location_id)
LOCATIONS = [
    (40.7128, -74.0060, 1),      # New York
    (34.0522, -118.2437, 2),     # Los Angeles
    (41.8781, -87.6298, 3),      # Chicago
    (29.7604, -95.3698, 4),      # Houston
    (33.7490, -84.3880, 5),      # Atlanta
    (19.0760, 72.8777, 21),   # Mumbai
    (18.5204, 73.8567, 22),   # Pune
    (21.1458, 79.0882, 23),   # Nagpur
    (19.9975, 73.7898, 24),   # Nashik
    (19.8762, 75.3433, 25),   # Chhatrapati Sambhajinagar (Aurangabad)
    (16.7050, 74.2433, 26),   # Kolhapur
    (23.0225, 72.5714, 27),   # Ahmedabad
    (21.1702, 72.8311, 28),   # Surat
    (22.3072, 73.1812, 29),   # Vadodara
    (22.3039, 70.8022, 30),   # Rajkot
    (21.7645, 72.1519, 31),   # Bhavnagar
    (22.4707, 70.0577, 32),   # Jamnagar
    (24.5854, 73.7125, 33),   # Udaipur
    (26.2389, 73.0243, 34),   # Jodhpur
    (25.2138, 75.8648, 35),   # Kota
    (26.4499, 74.6399, 36),   # Ajmer
    (15.4909, 73.8278, 37),   # Panaji
    (15.2993, 74.1240, 38),   # Goa (state centroid)
    (15.2750, 73.9580, 39),   # Margao
    (23.2156, 72.6369, 40),   # Gandhinagar

    # South India
    (12.9716, 77.5946, 41),   # Bengaluru
    (12.2958, 76.6394, 42),   # Mysuru
    (12.9141, 74.8560, 43),   # Mangaluru
    (15.3647, 75.1240, 44),   # Hubballi
    (13.0827, 80.2707, 45),   # Chennai
    (11.0168, 76.9558, 46),   # Coimbatore
    (9.9252, 78.1198, 47),    # Madurai
    (10.7905, 78.7047, 48),   # Tiruchirappalli
    (11.6643, 78.1460, 49),   # Salem
    (8.7139, 77.7567, 50),    # Tirunelveli
    (17.3850, 78.4867, 51),   # Hyderabad
    (17.9689, 79.5941, 52),   # Warangal
    (16.5062, 80.6480, 53),   # Vijayawada
    (17.6868, 83.2185, 54),   # Visakhapatnam
    (16.3067, 80.4365, 55),   # Guntur
    (14.4426, 79.9865, 56),   # Nellore
    (13.6288, 79.4192, 57),   # Tirupati
    (9.9312, 76.2673, 58),    # Kochi
    (8.5241, 76.9366, 59),    # Thiruvananthapuram
    (11.2588, 75.7804, 60),   # Kozhikode
    (10.5276, 76.2144, 61),   # Thrissur
    (11.8745, 75.3704, 62),   # Kannur
    (11.9416, 79.8083, 63),   # Puducherry
    (15.8281, 78.0373, 64),   # Kurnool
    (14.4673, 78.8242, 65),   # Kadapa
    (15.8497, 74.4977, 66),   # Belagavi
    (14.4644, 75.9218, 67),   # Davanagere
    (11.3410, 77.7172, 68),   # Erode
    (12.9165, 79.1325, 69),   # Vellore
    (18.6725, 78.0941, 70),   # Nizamabad

    # East and Central India
    (22.5726, 88.3639, 71),   # Kolkata
    (22.5958, 88.2636, 72),   # Howrah
    (23.5204, 87.3119, 73),   # Durgapur
    (26.7271, 88.3953, 74),   # Siliguri
    (25.5941, 85.1376, 75),   # Patna
    (24.7914, 85.0002, 76),   # Gaya
    (23.3441, 85.3096, 77),   # Ranchi
    (22.8046, 86.2029, 78),   # Jamshedpur
    (23.7957, 86.4304, 79),   # Dhanbad
    (20.2961, 85.8245, 80),   # Bhubaneswar
    (20.4625, 85.8830, 81),   # Cuttack
    (22.2604, 84.8536, 82),   # Rourkela
    (21.2514, 81.6296, 83),   # Raipur
    (22.0797, 82.1391, 84),   # Bilaspur
    (23.2599, 77.4126, 85),   # Bhopal
    (22.7196, 75.8577, 86),   # Indore
    (23.1815, 79.9864, 87),   # Jabalpur
    (26.2183, 78.1828, 88),   # Gwalior
    (23.1765, 75.7885, 89),   # Ujjain
    (23.8388, 78.7378, 90),   # Sagar

    # Northeast India
    (26.1445, 91.7362, 91),   # Guwahati
    (25.5788, 91.8933, 92),   # Shillong
    (23.8315, 91.2868, 93),   # Agartala
    (24.8170, 93.9368, 94),   # Imphal
    (23.7271, 92.7176, 95),   # Aizawl
    (25.6751, 94.1086, 96),   # Kohima
    (27.0844, 93.6053, 97),   # Itanagar
    (27.3389, 88.6065, 98),   # Gangtok
    (25.9040, 93.7276, 99),   # Dimapur
    (26.6528, 92.7926, 100),  # Tezpur
]

def fetch_and_store_weather():
    """Fetch weather from OpenWeatherMap and store in database"""
    conn = psycopg2.connect(
        host=os.getenv('DB_HOST'),
        database=os.getenv('DB_NAME'),
        user=os.getenv('DB_USER'),
        password=os.getenv('DB_PASSWORD'),
        port=os.getenv('DB_PORT', 5432)
    )
    cursor = conn.cursor()
    
    try:
        for lat, lon, location_id in LOCATIONS:
            response = requests.get(OPENWEATHER_URL, params={
                'lat': lat,
                'lon': lon,
                'appid': OPENWEATHER_API_KEY,
                'units': 'metric'
            })
            
            if response.status_code == 200:
                data = response.json()
                temp = data['main']['temp']
                pressure = data['main']['pressure']
                humidity = data['main']['humidity']
                
                cursor.execute("""
                INSERT INTO weather_readings (location_id, temp, pressure, humidity, created_at)
                VALUES (%s, %s, %s, %s, %s)
                """, (location_id, temp, pressure, humidity, datetime.now()))
                
                print(f"✓ Stored weather data for location {location_id}")
            else:
                print(f"✗ Failed to fetch weather for location {location_id}")
        
        conn.commit()
        print("✓ Weather data loaded successfully")
    
    except Exception as e:
        print(f"✗ Error loading weather data: {e}")
        conn.rollback()
    
    finally:
        cursor.close()
        conn.close()

if __name__ == "__main__":
    fetch_and_store_weather()