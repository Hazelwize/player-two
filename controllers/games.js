const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
require('dotenv').config({path: '../config/.env'})

module.exports = {
    getIndex : (req,res)=>{
        res.render('games.ejs',{name : req.user.username})
    },
    searchGames:(req,res)=>{
        let name = req.query.gameName
        fetch(`https://api.rawg.io/api/games?key=${process.env.RAWGAPIKEY}&search=${name}`,{
            method: 'get',
            headers: {'Content-Type':'application/json'},
        })
            .then(result => result.json())
            .then(games =>{
                console.log(games.results)
                const filteredGames = games.results.filter(e => e.rating !== 0)
                res.render('search.ejs', {games: filteredGames, name: req.user.username})
            })
            .catch(err => console.error(err))
    },       
    
    
}