require('dotenv').config();

const config = {
    PORT: process.env.PORT || 8001,

    JWT_SECRET: process.env.JWT_SECRET,

    DB_HOST: process.env.DB_HOST,
    DB_PORT: process.env.DB_PORT,
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,

    // # Mqtt
    MQTT_USER: process.env.MQTT_USER,
    MQTT_PASS: process.env.MQTT_PASS,

    // # Nodemailer
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
};

module.exports = config;