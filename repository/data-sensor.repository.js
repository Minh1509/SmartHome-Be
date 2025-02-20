const db = require('../config/database');
const DataSensor = require('../entity/data-sensor.entity');

class DataSensorRepository {
    static async searchDataSensorByType(temperature, humidity, light, query, sortField, sortDirection, pageNumber, pageSize) {
        let sql = `SELECT * FROM data_sensors WHERE 1=1`;
        let countSql = `SELECT COUNT(*) as totalRecords FROM data_sensors WHERE 1=1`;
        let params = [];
        let countParams = [];

        if (temperature !== undefined) {
            sql += ` AND temperature = ?`;
            countSql += ` AND temperature = ?`;
            params.push(temperature);
            countParams.push(temperature);
        }
        if (humidity !== undefined) {
            sql += ` AND humidity = ?`;
            countSql += ` AND humidity = ?`;
            params.push(humidity);
            countParams.push(humidity);
        }
        if (light !== undefined) {
            sql += ` AND light = ?`;
            countSql += ` AND light = ?`;
            params.push(light);
            countParams.push(light);
        }
        if (query) {
            sql += ` AND (temperature LIKE ? OR humidity LIKE ? OR light LIKE ? OR DATE_FORMAT(createdAt, '%d-%m-%Y %H:%i:%s') LIKE ?)`;
            countSql += ` AND (temperature LIKE ? OR humidity LIKE ? OR light LIKE ? OR DATE_FORMAT(createdAt, '%d-%m-%Y %H:%i:%s') LIKE ?)`;
            params.push(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`);
            countParams.push(`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`);
        }

        const [countResult] = await db.query(countSql, countParams);
        const totalRecords = countResult[0].totalRecords;
        const totalPages = Math.ceil(totalRecords / pageSize);

        sql += ` ORDER BY ${sortField} ${sortDirection} LIMIT ?, ?`;
        params.push((pageNumber-1) * pageSize, pageSize);

        const [rows] = await db.query(sql, params);
        const result = rows.map(row => new DataSensor(row.id, row.temperature, row.humidity, row.light, row.createdAt));

        return {
            data: result,
            metadata: {
                currentPage: pageNumber,
                pageSize: rows.length,
                totalRecords: totalRecords,
                totalPages: totalPages
            }
        };
    }
}

module.exports =DataSensorRepository;
