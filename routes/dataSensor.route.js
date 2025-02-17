const express = require('express');
const { getAllDataSensor } = require('../controllers/dataSensor.controller');
const router = express.Router();

router.get('/', getAllDataSensor);

module.exports = router;