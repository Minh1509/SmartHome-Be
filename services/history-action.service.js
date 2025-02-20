const HistoryActionRepository = require("../repository/history-action.repository");

class HistoryActionService {

    static async searchHistoryActions(query, sortField, sortDirection, pageNumber, pageSize) {
        const validFields = ["id", "device", "action", "createdAt"];
        if (!validFields.includes(sortField)) {
            throw new Error(`Invalid sort field: ${sortField}`);
        }

        return await HistoryActionRepository.searchHistoryActions(query, sortField, sortDirection.toUpperCase(), parseInt(pageNumber), parseInt(pageSize));
    }
}

module.exports = HistoryActionService;
