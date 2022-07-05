module.exports = {

    checkGameName: (req,res,next) =>{
        if(req.query.gameName == undefined){
            res.redirect('/games')
        }else{
            next()
        }
    },
    checkHasGame: (req,res,next) =>{
        let hasGame = req.user.games.some(e => e.gameName == req.params.gameName)
        console.log(hasGame)
        if(hasGame){
            res.redirect(`/games/profile/added/${req.params.gameName}`)
        }else{
            next()
        }
    },

}