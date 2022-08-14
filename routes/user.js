const express = require('express')
const router = express.Router()
const {ensureAuth, guestAuth} = require('../middleware/auth')
const userController = require('../controllers/user')

router.get('/profile', ensureAuth, userController.getProfile)
router.put('/updateHours', userController.updateGameHours)
router.put('/delete-game', userController.deleteGame)
router.post('/logout', userController.logout)
module.exports = router;