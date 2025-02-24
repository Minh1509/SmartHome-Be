const HistoryActionService = require("../services/history-action.service");

const searchHistoryActions = async (req, res) => {
    try {
        const { query, sortField = "id", sortDirection = "ASC", pageNumber = 1, pageSize = 10 } = req.query;

        const actions = await HistoryActionService.searchHistoryActions(query, sortField, sortDirection, parseInt(pageNumber), parseInt(pageSize));
        res.status(200).json({ success: true, data: actions });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    } 
};



module.exports = {  searchHistoryActions };
