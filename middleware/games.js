module.exports = {

    checkGameName: (req,res,next) =>{
        if(req.query.gameName == undefined){
            res.redirect('/games')
        }else{
            next()
        }
    },
    checkHasGame: (req,res,next) =>{
        if(req.user.games.includes(games.gameName == req.params.gameName)){
            res.redirect(`/games/profile/added/:${req.params.gameName}`)
        }else{
            next()
        }
    },

}