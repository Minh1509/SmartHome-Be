const express = require('express');
const { sendWarningEmail } = require('../controllers/mail.controller');
const { authentication } = require("../auth/authUtils")
const router = express.Router();
const { asyncHandler } = require("../helpers/asyncHandler");

router.use(authentication)
router.post('/send-warning', asyncHandler(sendWarningEmail));

module.exports = router;