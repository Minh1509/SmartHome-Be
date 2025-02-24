const UserService = require("../services/user.service.js");

class UserController {
    async login(req, res, next) {
        const result = await UserService.login(req.body);
        res.status(200).json({
            code: 200,
            message: "Login success",
            data: result,
        });
    }
}

module.exports = new UserController();