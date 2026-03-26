const pool = require('../db');

exports.getWeather = async (req, res) => {
  const { lat, lon } = req.params;

  const result = await pool.query(
    `SELECT * FROM weather_readings
     WHERE lat=$1 AND lon=$2
     ORDER BY recorded_at DESC
     LIMIT 50`,
    [lat, lon]
  );

  res.json(result.rows);
};