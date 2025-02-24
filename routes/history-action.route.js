const express = require('express');
const { searchHistoryActions } = require('../controllers/history-action.controller');
const router = express.Router()
const { authentication } = require("../auth/authUtils")
const { asyncHandler } = require("../helpers/asyncHandler");

router.use(authentication);
router.get('/search', asyncHandler(searchHistoryActions));
module.exports = router