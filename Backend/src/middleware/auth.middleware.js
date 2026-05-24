const jwt = require('jsonwebtoken')
const TokenBlacklistModel = require('../models/blacklist.model')


async function authUser (req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const isTokenBlackListed = await TokenBlacklistModel.findOne({
        token
    })
    if (isTokenBlackListed) {
        return res.status(401).json({ message: 'token is invalid' })
    }
try {
   const decoded = jwt.verify(token, process.env.JWT_SECRET)

   req.user = decoded
   next()
} catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
}
}

module.exports = { authUser }