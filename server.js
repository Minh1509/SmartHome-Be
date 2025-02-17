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
require("./db/init.mysql");

// MQTT
require("./services/mqtt.service");

// Router
app.use("/", require("./routes/index"))

const PORT = config.PORT
server.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT}`)
});
