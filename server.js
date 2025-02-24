const express = require('express'); //thư viện express
const app = express();
const cors = require('cors');
const helmet = require('helmet')
const morgan = require('morgan');
const config = require('./config/config.service');
require('dotenv').config()

app.use(cors());
app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}));
app.use(morgan('dev'))

const server = require('http').Server(app);
const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

// DB
require("./config/database");

// MQTT
require("./services/mqtt.service");

// Router
app.use("/", require("./routes/index"))

// Handle exception
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    const statusCode = error.status || 404;
    return res.status(statusCode).json({
        status: "error",
        code: statusCode,
        stack: error.stack,
        message: error.message || "Internal Server Error",
    });
});

const PORT = config.PORT
server.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT}`)
});
