const express = require('express');
const { Relay } = require('../controllers/relay.controller');
const router = express.Router()
const { authentication } = require("../auth/authUtils")

router.use(authentication);
router.get('/', Relay);
module.exports = router