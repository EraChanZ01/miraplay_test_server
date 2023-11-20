const express = require('express')
const gameController = require('../controller/gameController')

const gameRouter = express.Router()

gameRouter.post('/', gameController.getGame)

module.exports = gameRouter