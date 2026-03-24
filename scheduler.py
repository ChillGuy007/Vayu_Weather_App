#!/usr/bin/env python3
"""
Scheduler for anomaly detection engine
Run via cron: 0 * * * * /path/to/scheduler.py
Or via Node.js child_process: child_process.exec('python /path/to/scheduler.py')
"""

import subprocess
import logging
import os
from datetime import datetime
from pathlib import Path

# Setup logging
log_dir = Path(__file__).parent / 'logs'
log_dir.mkdir(exist_ok=True)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler(log_dir / 'anomaly_engine.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

def run_anomaly_detection():
    """Execute the anomaly detection engine"""
    script_path = Path(__file__).parent / 'anomaly_engine.py'
    
    try:
        logger.info("Starting anomaly detection engine...")
        result = subprocess.run(
            ['python3', str(script_path)],
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )
        
        if result.returncode == 0:
            logger.info("Anomaly detection completed successfully")
            if result.stdout:
                logger.info(f"Output:\n{result.stdout}")
        else:
            logger.error(f"Anomaly detection failed with code {result.returncode}")
            if result.stderr:
                logger.error(f"Error:\n{result.stderr}")
    
    except subprocess.TimeoutExpired:
        logger.error("Anomaly detection timed out (exceeded 5 minutes)")
    except Exception as e:
        logger.error(f"Failed to execute anomaly detection: {e}")

if __name__ == "__main__":
    run_anomaly_detection()
