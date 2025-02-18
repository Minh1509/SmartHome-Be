const jwt = require('jsonwebtoken')
const config = require('../config/config.service')

const HEADER = {
    AUTHORIZATION: 'authorization'
}
const createPairToken = (payload) => {
    try {
        const jwt_secret = config.JWT_SECRET;
        const accessToken = jwt.sign(payload, jwt_secret, {
            expiresIn: '30m'
        })
        return { accessToken }
    } catch (error) {
        console.error('Error:', error);
    }
}

const authentication = (req, res, next) => {
    try {
        const authHeader = req.headers[HEADER.AUTHORIZATION];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: "Invalid token format" });
        }

        const accessToken = authHeader.split(' ')[1];
        const jwt_secret = config.JWT_SECRET;
        const decodeUser = jwt.verify(accessToken, jwt_secret);

        req.user = decodeUser;
        return next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};


module.exports = { createPairToken, authentication }