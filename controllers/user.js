const User = require("../models/User")

module.exports = {
    getIndex : (req,res)=>{
        res.render('index.ejs')
    },
    getProfile: (req,res) =>{
        res.render('user-profile.ejs',{games: req.user.games, name: req.user.username, id: req.user.discordID, avatar: req.user.avatar})
    },
    updateGameHours: async(req,res) =>{
        try{
            const gameName = req.body.gameToUpdate
            const hours = req.body.updatedHours
            console.log(gameName, hours)
            await User.updateOne({_id: req.user._id, 'games.gameName': gameName}, {$set:{'games.$.hoursPlayed': hours}})
            console.log(hours, gameName)
            res.json('hours updated')
        }
        catch(err){
            console.log(err)
        }
           
    },
    deleteGame: async(req,res) =>{
        try{
            const gameToDelete = req.body.gameToDelete
            const doc = await User.findOne({_id: req.user._id})
            doc.games = doc.games.filter(e => e.gameName !== gameToDelete)
            await doc.save()
            console.log(gameToDelete)
            res.json('game deleted')
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