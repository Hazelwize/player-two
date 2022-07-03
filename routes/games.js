const express = require('express')
const router = express.Router()
const {ensureAuth, guestAuth} = require('../middleware/auth')
const {checkGameName} = require('../middleware/games')
const gamesController = require('../controllers/games')


router.get('/',ensureAuth, gamesController.getIndex)
router.get('/search', checkGameName , gamesController.searchGames)
router.get('/profile/:gameName', gamesController.getGameProfile)

module.exports = router