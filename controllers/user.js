const User = require("../models/User")
const Game = require("../models/Game")

module.exports = {
    getIndex : (req,res)=>{
        res.render('index.ejs')
    },
    getProfile: async (req,res) =>{
        const games = await Game.find({userId: req.user._id})
        console.log(games)
        res.render('user-profile.ejs',{games: games, name: req.user.username, id: req.user.discordID, avatar: req.user.avatar})
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
}