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
    checkGameAdded: async(req,res,next) =>{
        try{
            let hasGame = await Game.findOne({slug: req.body.slug, userId: req.user._id})
            if(hasGame){
                res.redirect(`/games/profile/added/${req.body.slug}`)
            }else{
                next()
            }
        }
        catch(err){
            console.log(err)
        }
    },
    checkHours: async(req,res,next) => {
        try{
            if(+req.body.hoursPlayed < 1){
                res.redirect(`/games/profile/${req.body.slug}`)
            }else{
                return next()
            }
        }
        catch(err){
            console.log(err)
        }
    }

}