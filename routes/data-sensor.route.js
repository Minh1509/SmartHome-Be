const express = require('express');
const { searchDataSensors } = require('../controllers/data-sensor.controller');
const router = express.Router();
const { authentication } = require("../auth/authUtils")

router.use(authentication);
router.get('/search', searchDataSensors);

module.exports = router;