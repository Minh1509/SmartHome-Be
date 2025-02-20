const db = require("../config/database");
const HistoryAction = require("../entity/history-action.entity");

class HistoryActionRepository {
    static async searchHistoryActions(query, sortField, sortDirection, pageNumber, pageSize) {
        let sql = "SELECT * FROM history_actions WHERE 1=1";
        let countSql = "SELECT COUNT(*) as totalRecords FROM history_actions WHERE 1=1";
        let params = [];
        let countParams = [];

        if (query) {
            sql += ` AND (device LIKE ? OR action LIKE ? OR DATE_FORMAT(createdAt, '%d-%m-%Y %H:%i:%s') LIKE ?)`;
            countSql += ` AND (device LIKE ? OR action LIKE ? OR DATE_FORMAT(createdAt, '%d-%m-%Y %H:%i:%s') LIKE ?)`;
            params.push(`%${query}%`, `%${query}%`, `%${query}%`);
            countParams.push(`%${query}%`, `%${query}%`, `%${query}%`);
        }

        // Lấy tổng số bản ghi
        const [countResult] = await db.query(countSql, countParams);
        const totalRecords = countResult[0].totalRecords;
        const totalPages = Math.ceil(totalRecords / pageSize);

        // Thêm sắp xếp và phân trang
        sql += ` ORDER BY ${sortField} ${sortDirection} LIMIT ?, ?`;
        params.push((pageNumber-1) * pageSize, pageSize);

        const [rows] = await db.query(sql, params);
        const result = rows.map(row => new HistoryAction(row.id, row.device, row.action, row.createdAt));

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

module.exports = HistoryActionRepository;
