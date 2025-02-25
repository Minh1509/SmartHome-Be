const { sendEmail } = require("../services/mail.service");

module.exports.sendWarningEmail = async (req, res, next) => {
    const to = req.user.email;
    const { type, value } = req.body;
    await sendEmail(to, type, value);
    return res.status(200).json({
        status: "Success",
        message: "Send mail warning success",
        code: 200
    })
}