class DataSensor {
    constructor(id, temperature, humidity, light, createdAt) {
        this.id = id;
        this.temperature = temperature;
        this.humidity = humidity;
        this.light = light;
        this.createdAt = createdAt;
    }
}

module.exports = DataSensor;
