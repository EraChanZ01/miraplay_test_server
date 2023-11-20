const User = require('../models/Users')
const bcrypt = require('bcrypt')
const createSession = require('../middlewares/createSession')
const ApplicationError = require('../Error/ApplicationError')

module.exports.register = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email })
        if (foundUser) next(new ApplicationError('Користувач із такою поштою вже існує'))

        const createdUser = await User.create({ email: req.body.email, password: req.hashPass })
        const token = await createSession.createdToken(createdUser)
        res.status(200).send({ user: createdUser, token })
    } catch (e) {
        next(e)
    }
}

module.exports.login = async (req, res, next) => {
    try {
        const foundUser = await User.findOne({ email: req.body.email })
        if (!foundUser) {
            next(new ApplicationError('Користувача з такою поштою не існує'))
        } else {
            const match = await bcrypt.compare(req.body.password, foundUser.password)
            if (match) {
                const token = await createSession.createdToken(foundUser)
                res.status(200).send({ user: foundUser, token })
            } else {
                next(new ApplicationError('Помилковий пароль'))
            }
        }
    } catch (e) {
        next(e)
    }
}