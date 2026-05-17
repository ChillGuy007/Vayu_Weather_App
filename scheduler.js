const cron = require('node-cron');
const fetchWeather = require('./fetcher');
const { exec } = require('child_process');

cron.schedule('0 * * * *', async () => {
  console.log("Running pipeline...");

  await fetchWeather();

  exec('d:/Vayu/.venv/Scripts/python.exe anomaly_engine.py', (err, stdout, stderr) => {
    if (err) {
      console.error("Python error:", err);
      return;
    }
    console.log(stdout);
  });
});
