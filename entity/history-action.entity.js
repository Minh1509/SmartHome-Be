class HistoryAction {
    constructor(id, device, action, createdAt) {
        this.id = id;
        this.device = device;
        this.action = action;
        this.createdAt = createdAt || new Date(); // Nếu không có createdAt, lấy thời gian hiện tại
    }
}

module.exports = HistoryAction;
