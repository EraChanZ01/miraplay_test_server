const ApplicationError = require('../Error/ApplicationError')

module.exports.getGame = async (req, res, next) => {
    try {
        const option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        }

        const games = await fetch('https://api.miraplay.cloud/games/by_page', option)
        const gamesData = await games.json()
        if (gamesData) {
            res.status(200).send(gamesData)
        } else {
            next(new ApplicationError())
        }
    } catch (e) {
        next(e)
    }
}