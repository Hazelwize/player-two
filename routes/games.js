const express = require('express')
const router = express.Router()
const gamesController = require('../controllers/games')


router.get('/', gamesController.getIndex)




module.exports = router