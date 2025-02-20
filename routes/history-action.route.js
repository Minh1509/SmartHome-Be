const express = require('express');
const { searchHistoryActions } = require('../controllers/history-action.controller');
const router = express.Router()
const { authentication } = require("../auth/authUtils")

router.use(authentication);
router.get('/search', searchHistoryActions);
module.exports = router