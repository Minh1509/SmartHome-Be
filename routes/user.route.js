const express = require('express');
const UserController = require('../controllers/user.controller')
const router = express.Router()
const { asyncHandler } = require("../helpers/asyncHandler");

router.post('/login', asyncHandler(UserController.login));
module.exports = router