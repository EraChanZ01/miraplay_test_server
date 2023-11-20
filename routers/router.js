const express = require('express')
const authRouter = require('./authRouter')
const gameRouter = require('./gameRouter')



const router = express.Router()

router.use('/auth', authRouter)
router.use('/game', gameRouter)

module.exports = router