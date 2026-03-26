const pool = require('../db');

exports.addContact = async (req, res) => {
  const { name, phone } = req.body;

  await pool.query(
    'INSERT INTO emergency_contacts (user_id, name, phone) VALUES ($1,$2,$3)',
    [req.user.id, name, phone]
  );

  res.json({ msg: "Contact added" });
};

exports.getContacts = async (req, res) => {
  const result = await pool.query(
    'SELECT * FROM emergency_contacts WHERE user_id=$1',
    [req.user.id]
  );

  res.json(result.rows);
};