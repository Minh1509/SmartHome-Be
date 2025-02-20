const DataSensorRepository = require('../repository/data-sensor.repository');

class DataSensorService {


    static async searchDataSensorByType(temperature, humidity, light, query, sortField, sortDirection, pageNumber, pageSize) {
        const validFields = ["id", "temperature", "humidity", "light"];
        if (!validFields.includes(sortField)) {
            throw new Error(`Invalid sort field: ${sortField}`);
        }

        return await DataSensorRepository.searchDataSensorByType(
            temperature ? parseFloat(temperature) : undefined,
            humidity ? parseFloat(humidity) : undefined,
            light ? parseFloat(light) : undefined,
            query,
            sortField,
            sortDirection.toUpperCase(),
            parseInt(pageNumber),
            parseInt(pageSize)
        );
    }


}

module.exports = DataSensorService;
