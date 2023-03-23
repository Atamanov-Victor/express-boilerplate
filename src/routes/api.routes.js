const express = require('express');

const router = express.Router();
const { apiController } = require('../controllers');

router.get('/ping', apiController.ping);

module.exports = router;
