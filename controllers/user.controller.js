const UserService = require("../services/user.service.js");

class UserController {
    async login(req, res, next) {
        console.log(req.body)
        const result = await UserService.login(req.body);
        res.status(200).json({
            code: 200,
            message: "Loginb success",
            data: result,

        });
    }
}

module.exports = new UserController();