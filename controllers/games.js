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
                console.log(games.results.id)
                const filteredGames = games.results.filter(e => e.rating >= 3)
                res.render('search.ejs', {games: filteredGames, name: req.user.username})
            })
            .catch(err => console.error(err))
    },  
    getGameProfile:(req,res)=>{
        let name = req.params.gameName
        fetch(`https://api.rawg.io/api/games?key=${process.env.RAWGAPIKEY}&search=${name}&search_exact=true`,{
            method: 'get',
            headers: {'Content-Type':'application/json'},
            
        })
            .then(result => result.json())
            .then(data =>{
                console.log(data.results)
                
                res.render('game_profile.ejs', {game: data, name: req.user.username})
            })
            .catch(err => console.error(err))
    },  
    
    
}