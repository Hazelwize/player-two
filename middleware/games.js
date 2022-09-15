const Game = require('../models/Game')

module.exports = {
    checkGameName: (req,res,next) =>{
        if(req.query.gameName == undefined){
            req.query.gameName = ' '
            next()
        }else{
            next()
        }
    },
    checkHasGame: async (req,res,next) =>{
        try{
            let hasGame = await Game.findOne({slug: req.params.gameName, userId: req.user._id})
            console.log(hasGame)
            if(hasGame){
                res.redirect(`/games/profile/added/${req.params.gameName}`)
            }else{
                next()
            }
        }
        catch(err){
            console.log(err)
        }
        
    },

}