const { getAllDataSensor } = require("../services/dataSensor.service")


module.exports.getAllDataSensor = async (req, res, next) => {
    try {
        const data = await getAllDataSensor();
        res.status(200).json(data);
    } catch (error) {
        next(error);
    }
};