module.exports = {
    getIndex : (req,res)=>{
        res.render('index.ejs')
    },
    getProfile: (req,res) =>{
        res.render('user-profile.ejs',{games: req.user.games, name: req.user.username, id: req.user.discordID, avatar: req.user.avatar})
    },
}