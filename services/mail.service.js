const nodemailer = require("nodemailer");
const config = require("../config/config.service");
const transporter = nodemailer.createTransport({ // config mail server
    host: config.EMAIL_HOST,
    port: +config.EMAIL_PORT,
    secure: true,
    auth: {
        user: config.EMAIL_USER,
        pass: config.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendEmail = async (to) => {
    try {
        const temperature = 35
        const subject = "Cảnh báo: Nhiệt độ vượt ngưỡng!";
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">
                <h2 style="color: #721c24;">⚠ Cảnh báo Nhiệt độ Cao!</h2>
                <p>Nhiệt độ hiện tại đã vượt quá ngưỡng 35°C.</p>
                <p><strong>Nhiệt độ hiện tại:</strong> ${temperature}°C</p>
                <p>Vui lòng kiểm tra và có biện pháp xử lý kịp thời.</p>
            </div>
        `;

        const mailOptions = {
            from: `"SmartHome" <${config.EMAIL_USER}>`,
            to,
            subject,
            html,
        };

        return await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = { sendEmail, transporter }
