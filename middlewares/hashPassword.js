const bcrypt = require('bcrypt');
const config = require('../config')


module.exports.hashPassword = async (req, res, next) => {
    try {
        req.hashPass = await bcrypt.hash(req.body.password, config.token.SALT_ROUNDS);
        next()
    } catch (e) {
        next(e)
    }
}