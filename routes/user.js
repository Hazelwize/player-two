const express = require('express')
const router = express.Router()
const {ensureAuth, guestAuth} = require('../middleware/auth')
const userController = require('../controllers/user')

router.get('/profile', ensureAuth, userController.getProfile)


module.exports = router;