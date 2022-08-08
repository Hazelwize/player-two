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
}