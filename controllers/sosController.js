const pool = require('../db');
const io = require('../socketInstance'); // we'll create this

exports.sendSOS = async (req, res) => {
  const { lat, lon } = req.body;

  const contacts = await pool.query(
    'SELECT * FROM emergency_contacts WHERE user_id=$1',
    [req.user.id]
  );

  // simulate alert
  io.emit("sos_alert", { lat, lon, contacts: contacts.rows });

  res.json({ msg: "SOS sent" });
};