const router = require('express').Router();
const { getWeather } = require('../controllers/weatherController');

router.get('/:lat/:lon', getWeather);

module.exports = router;