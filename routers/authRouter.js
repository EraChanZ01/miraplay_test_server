const express = require('express')
const hashPasswordMiddle = require('../middlewares/hashPassword')
const authController = require('../controller/authController')
const createSession = require('../middlewares/createSession')

const userRouter = express.Router()

userRouter.get('/checkAuth', createSession.verefyToken, createSession.checkAuth)
userRouter.post('/register', hashPasswordMiddle.hashPassword, authController.register)
userRouter.post('/login', authController.login)

module.exports = userRouter