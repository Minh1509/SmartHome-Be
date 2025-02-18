const express = require('express');
const { sendWarningEmail } = require('../controllers/mail.controller');
const { authentication } = require("../auth/authUtils")
const router = express.Router();

router.use(authentication)
router.post('/send-warning', sendWarningEmail);

module.exports = router;