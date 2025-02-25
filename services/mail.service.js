const nodemailer = require("nodemailer");
const config = require("../config/config.service");
const transporter = nodemailer.createTransport({
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

const TypeWaring = {
    temperature: 'Nhiệt độ',
    humidity: "Độ ẩm",
    light: 'Ánh sáng'
}
const sendEmail = async (to, type, value) => {
    try {
        const subject = `Cảnh báo: ${TypeWaring[type]} vượt ngưỡng!`;
        const html = `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;">
                <h2 style="color: #721c24;">⚠ Cảnh báo ${TypeWaring[type]} Cao!</h2>
                <p>${TypeWaring[type]} hiện tại đã vượt quá ngưỡng 35°C.</p>
                <p><strong>${TypeWaring[type]} hiện tại:</strong> ${value}°C</p>
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
