const User = require("../models/User")
const Game = require("../models/Game")
const FriendCode = require('../models/FriendCode')

module.exports = {
    getIndex : (req,res)=>{
        res.render('index.ejs')
    },
    getProfile: async (req,res) =>{
        const games = await Game.find({userId: req.user._id})
        const codes = await FriendCode.findOne({userId: req.user._id})
        console.log(games)
        res.render('user-profile.ejs',{games: games, codes: codes , name: req.user.username, id: req.user.discordID, avatar: req.user.avatar})
    },
    updateGameHours: async(req,res) =>{
        try{
            console.log(req.body.hours)
            await Game.updateOne({_id: req.params.game},{hours: req.body.hours})
            res.redirect('/user/profile')
        }
        catch(err){
            console.log(err)
        }
           
    },
    deleteGame: async(req,res) =>{
        try{
            await Game.deleteOne({_id:req.params.game})
            console.log(req.params.game)
            res.redirect('/user/profile')
        }
        catch(err){
            console.log(err)
        }
    },
    logout: async(req,res) =>{
        try{
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/');
              });
        }
        catch(err){
            console.log(err)
        }
    },
    getFriendProfile: async(req,res) => {
        try{
            const profile = await User.findOne({_id: req.params.id})
            const userGames = await Game.find({userId: req.params.id})
            const codes = await FriendCode.findOne({userId: req.params.id})
            res.render('friend_profile.ejs', { name: req.user.username, id:req.user.discordID, avatar: req.user.avatar, friend: profile, codes: codes, games: userGames })
        }
        catch(err){
            console.log(err)
        }
        
    },
    updateFriendCodes: async(req,res) => {
        try{
            console.log(req.body)
            await FriendCode.updateOne(
                {userId: req.user._id},
                {userId: req.user._id, nintendo: req.body.nintendo, playstation: req.body.playstation, xbox: req.body.xbox, steam: req.body.steam},
                {upsert: true} )
            res.redirect('/user/profile')
        }
        catch(err){
            console.log(err)
        }
    },
}