const express = require('express')
const router = express.Router()
const {ensureAuth, guestAuth} = require('../middleware/auth')
const gamesController = require('../controllers/games')


router.get('/',ensureAuth, gamesController.getIndex)
router.get('/search', gamesController.searchGames)

module.exports = router