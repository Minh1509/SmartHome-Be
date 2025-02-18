const express = require('express');
const router = express.Router();

router.use("/api/user", require("./user.route"));
router.use("/api/datasensor", require("./dataSensor.route"));
router.use("/api/relay", require("./Relay.route"));
router.use("/api/mail", require("./mail.route"));

module.exports = router;