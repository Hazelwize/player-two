const express = require('express')
const router = express.Router()
const {ensureAuth, guestAuth} = require('../middleware/auth')
const {checkGameName, checkHasGame} = require('../middleware/games')
const gamesController = require('../controllers/games')

router.get('/search', ensureAuth, checkGameName, gamesController.searchGames)
router.get('/profile/:gameName', checkHasGame, gamesController.getGameProfile)
router.post('/addGame', gamesController.addGame)
router.get('/profile/added/:gameName', gamesController.getGameFriendList)

module.exports = router