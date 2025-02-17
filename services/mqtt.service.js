const mqtt = require('mqtt');
const dbConn = require('../db/init.mysql'); // Adjust the path as necessary
const config = require('../config/config.service');
const io = require('socket.io')(3000, {
    cors: {
        origin: 'http://localhost:3000',
    },
});

const client = mqtt.connect('mqtt://localhost', {
    username: config.MQTT_USER,
    password: config.MQTT_PASS
}); // tạo 1 kênh kết nốt MQTT tới máy chủ 

client.on('connect', function () {
    console.log('mqtt connected'); // in thông báo mqtt thiết lập thành công
    client.subscribe('sensor'); //phần cứng gửi dữ liệu lên, bên này sub vào kênh sensor
});

//khi đã pub lên rồi thì sub được nhận ở client message, lắng nghe các message
client.on('message', function (topic, message) {
    //topic là chủ đề, message là cái mình gửi
    const data = JSON.parse(message);
    var state_1 = data.state_1;
    var state_2 = data.state_2;
    var state_3 = data.state_3;
    var temp_data = Math.floor(Math.round(data.temperature));
    var humi_data = data.humidity;
    var light_data = Math.floor(Math.round(data.light));
    var db_data = data.db;

    //cho giá trị vào bảng data trên mysql
    var sql = 'INSERT INTO sensordata (temp, humi, light, db) VALUES (' +
        temp_data + ' , ' +
        humi_data + ' , ' +
        light_data + ' , ' +
        db_data + ')';

    dbConn.query(sql, function (err, result) {
        if (err) throw err;
        console.log(
            ' temp : ' + temp_data +
            ' ,humi: ' + humi_data +
            ', light: ' + light_data +
            ', db: ' + db_data +
            ' ',
        );
    });

    io.emit('temp', temp_data);
    io.emit('humi', humi_data);
    io.emit('light', light_data);
    io.emit('relay_1', state_1);
    io.emit('relay_2', state_2);
    io.emit('relay_3', state_3);
    io.emit('db', db_data);

    console.log(state_1, state_2, state_3);
});

io.on('connection', function (socket) {
    console.log('user ' + socket.id + ' connected'); //thông báo có người kết nối
    socket.on('control_relay_1', function (state1) {
        if (state1 == '1') {
            client.publish('relay_1', '1'); //pub sang bên esp
            dbConn.query(
                "insert into relay(relay_id, state) value ( 'LED' , 'ON') ",
            );
        } else {
            client.publish('relay_1', '0');
            dbConn.query(
                "insert into relay(relay_id, state) value ( 'LED' , 'OFF') ",
            );
        }
    });

    socket.on('control_relay_2', function (state2) {
        if (state2 == '1') {
            client.publish('relay_2', '1');
            dbConn.query(
                "insert into relay(relay_id, state) value ( 'FAN' , 'ON') ",
            );
        } else {
            client.publish('relay_2', '0');
            dbConn.query(
                "insert into relay(relay_id, state) value ( 'FAN' , 'OFF') ",
            );
        }
    });

    socket.on('control_relay_3', function (state3) {
        if (state3 == '1') {
            client.publish('relay_3', '1');
            dbConn.query(
                "insert into relay(relay_id, state) value ( 'AC' , 'ON') ",
            );
        } else {
            client.publish('relay_3', '0');
            dbConn.query(
                "insert into relay(relay_id, state) value ( 'AC' , 'OFF') ",
            );
        }
    });
});

module.exports = client;