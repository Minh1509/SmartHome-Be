const DataSensorRepository = require('../repository/data-sensor.repository');

class DataSensorService {


    static async searchDataSensorByType(type, query, sortField, sortDirection, pageNumber, pageSize) {
        const validFields = ["id", "temperature", "humidity", "light", "createdAt"];
        if (!validFields.includes(sortField)) {
            throw new Error(`Invalid sort field: ${sortField}`);
        }

        return await DataSensorRepository.searchDataSensorByType(
            type,
            query,
            sortField,
            sortDirection.toUpperCase(),
            parseInt(pageNumber),
            parseInt(pageSize)
        );
    }


}

module.exports = DataSensorService;
