const express = require('express')
const passport = require('passport')
const config = require('../config/config')
const {checkAuth} = require('../middleware/auth')
const router = express.Router()


router.get('/discord', checkAuth, passport.authenticate('discord'), (req,res)=>{
    console.log(req.user)
    res.send(200)
});
router.get('/discord/redirect', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    console.log(req.user)
    res.redirect('/games') // Successful auth
});

module.exports = router