const express = require('express')
const passport = require('passport')
const config = require('../config/config')
const router = express.Router()


router.get('/discord', passport.authenticate('discord'), (req,res)=>{
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