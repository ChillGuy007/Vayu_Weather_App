const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const { sendSOS } = require('../controllers/sosController');

router.post('/', auth, sendSOS);

module.exports = router;