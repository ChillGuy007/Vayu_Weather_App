#!/usr/bin/env node
/**
 * Node.js Scheduler for Anomaly Detection Engine
 * Usage: node scheduler.js
 * Or set up with node-cron for hourly execution
 */

const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

// Setup logging directory
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
}

const logFile = path.join(logsDir, `anomaly_engine_${new Date().toISOString().split('T')[0]}.log`);

function log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    console.log(logMessage);
    fs.appendFileSync(logFile, logMessage + '\n');
}

function runAnomalyDetection() {
    const scriptPath = path.join(__dirname, 'anomaly_engine.py');
    
    log('Starting anomaly detection engine...');
    
    execFile('python3', [scriptPath], {
        timeout: 300000, // 5 minutes
        maxBuffer: 10 * 1024 * 1024 // 10MB
    }, (error, stdout, stderr) => {
        if (error) {
            log(`ERROR: ${error.message}`);
            if (stderr) log(`STDERR: ${stderr}`);
            return;
        }
        
        if (stdout) log(`OUTPUT: ${stdout}`);
        log('Anomaly detection completed successfully');
    });
}

// Run immediately
runAnomalyDetection();

// Optional: Set up hourly execution using node-cron
// Uncomment below and install: npm install node-cron
/*
const cron = require('node-cron');

// Run at the top of every hour
cron.schedule('0 * * * *', () => {
    log('Cron job triggered');
    runAnomalyDetection();
});

log('Scheduler started - running anomaly detection at the top of every hour');
*/
