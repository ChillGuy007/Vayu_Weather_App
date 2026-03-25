const cron = require('node-cron');
const fetchWeather = require('./fetcher');

// Runs every hour
cron.schedule('0 * * * *', () => {
  console.log("Running weather fetch job...");
  fetchWeather();
});

console.log("Scheduler started...");