const { createPairToken } = require("../auth/authUtils")
class UserService {
    constructor() {
        this.users = [
            { username: 'minh', password: 'minh', email: "nguyenquangminh15092003@gmail.com" },
            { username: 'dong', password: 'dong', email: "dong@gmail.com" },
            { username: 'hieu', password: 'hieu', email: "hieu@gmail.com" },
            { username: 'hoang', password: 'hoang', emial: "hoang@gmail.com" }
        ];
    }

    async login({ username, password }) {
        const user = this.users.find(user => user.username === username && user.password === password);
        if (!user) throw new Error("Invalid username or password")

        const payload = { username: user.username, email: user.email }
        const { accessToken } = createPairToken(payload);
        return {
            user: user,
            accessToken: accessToken
        }
    }
}

module.exports = new UserService();