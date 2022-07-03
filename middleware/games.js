module.exports = {

    checkGameName: (req,res,next) =>{
        if(req.query.gameName == undefined){
            res.redirect('/games')
        }else{
            next()
        }
    },

}