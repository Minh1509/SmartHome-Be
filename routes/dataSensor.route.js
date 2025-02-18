const express = require('express');
const { getAllDataSensor } = require('../controllers/dataSensor.controller');
const router = express.Router();
const { authentication } = require("../auth/authUtils")

router.use(authentication);
router.get('/', getAllDataSensor);

module.exports = router;