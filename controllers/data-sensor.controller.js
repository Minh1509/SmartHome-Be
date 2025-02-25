const DataSensorService = require('../services/data-sensor.service');

const searchDataSensors = async (req, res) => {
    try {
        const { type = 'all', query, sortField = 'id', sortDirection = 'ASC', pageNumber = 1, pageSize = 10 } = req.query;

        const sensors = await DataSensorService.searchDataSensorByType(
            type, query, sortField, sortDirection, pageNumber, pageSize
        );

        res.status(200).json({ success: true, data: sensors });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};




module.exports = { searchDataSensors };
