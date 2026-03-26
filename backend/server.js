require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initSocket } = require('./socket');


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/weather', require('./routes/weather'));
app.use('/api/anomalies', require('./routes/anomaly'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/sos', require('./routes/sos'));
app.use('/api/contacts', require('./routes/contacts'));

const server = app.listen(5000, () =>
  console.log("Server running on port 5000")
);

initSocket(server);