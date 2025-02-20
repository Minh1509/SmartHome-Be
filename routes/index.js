const express = require('express');
const router = express.Router();

router.use("/api/user", require("./user.route"));
router.use("/api/data_sensors", require("./data-sensor.route"));
router.use("/api/history_actions", require("./history-action.route"));
router.use("/api/mail", require("./mail.route"));

module.exports = router;