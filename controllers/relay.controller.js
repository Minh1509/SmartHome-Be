const { Relay } = require("../services/relay.service")

module.exports.Relay = async (req, res, next) => {
    try {
        const data = await Relay()
        res.status(200).json(data);
    } catch (error) {
        next(error)
    }
}