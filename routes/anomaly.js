router.post('/trigger', (req, res) => {
  const { lat, lon, severity, score } = req.body;

  const getIO = require('../socketInstance');

  getIO().emit("anomaly_alert", {
    lat,
    lon,
    severity,
    score,
    message: "Critical weather anomaly detected 🚨"
  });

  res.json({ msg: "Alert sent" });
});