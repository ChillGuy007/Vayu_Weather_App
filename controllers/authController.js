const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    'INSERT INTO users (email, password) VALUES ($1, $2)',
    [email, hash]
  );

  res.json({ msg: "User created" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query(
    'SELECT * FROM users WHERE email=$1',
    [email]
  );

  if (user.rows.length === 0)
    return res.status(400).json({ msg: "User not found" });

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid)
    return res.status(400).json({ msg: "Wrong password" });

  const token = jwt.sign(
    { id: user.rows[0].id },
    process.env.JWT_SECRET
  );

  res.json({ token });
};