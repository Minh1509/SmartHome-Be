const express = require('express');
const { searchDataSensors } = require('../controllers/data-sensor.controller');
const router = express.Router();
const { authentication } = require("../auth/authUtils")
const { asyncHandler } = require("../helpers/asyncHandler");

router.use(authentication);
router.get('/search', asyncHandler(searchDataSensors));

module.exports = router;