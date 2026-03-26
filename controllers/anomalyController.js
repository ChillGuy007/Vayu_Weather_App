exports.getAnomalies = async (req, res) => {
  const result = await pool.query(`
    SELECT a.*, w.lat, w.lon
    FROM anomaly_scores a
    JOIN weather_readings w
    ON a.reading_id = w.id
    ORDER BY a.detected_at DESC
    LIMIT 100
  `);

  res.json(result.rows);
};