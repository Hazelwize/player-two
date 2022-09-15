const express = require('express')
const router = express.Router()
const {ensureAuth, guestAuth} = require('../middleware/auth')
const userController = require('../controllers/user')

router.get('/profile', ensureAuth, userController.getProfile)
router.put('/updateHours/:game', userController.updateGameHours)
router.delete('/delete-game/:game', userController.deleteGame)
router.post('/logout', userController.logout)
module.exports = router;