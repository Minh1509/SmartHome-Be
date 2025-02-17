const express = require('express');
const { Relay } = require('../controllers/relay.controller');
const router = express.Router()

router.get('/', Relay);
module.exports = router