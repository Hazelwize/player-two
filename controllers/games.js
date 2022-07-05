// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios').default
const User = require('../models/User')
require('dotenv').config({path: '../config/.env'})

module.exports = {
    getIndex : (req,res)=>{
        res.render('games.ejs',{name : req.user.username})
    },
    // searchGames:(req,res)=>{
    //     let name = req.query.gameName
    //     fetch(`https://api.rawg.io/api/games?key=${process.env.RAWGAPIKEY}&search=${name}`,{
    //         method: 'get',
    //         headers: {'Content-Type':'application/json'},
            
    //     })
    //         .then(result => result.json())
    //         .then(games =>{
    //             console.log(games.results)
    //             console.log(games.results.id)
    //             const filteredGames = games.results.filter(e => e.rating >= 3)
    //             res.render('search.ejs', {games: filteredGames, name: req.user.username})
    //         })
    //         .catch(err => console.error(err))
    // },  
    searchGames: async(req,res) =>{
        try{
            let name = req.query.gameName
            let response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWGAPIKEY}&search=${name}&search_precise=true`,{
                headers: {'Content-Type': 'application/json'}
            })
            console.log(response)
            const filteredGames = response.data.results.filter(e => e.rating >= 3)
            res.render('search.ejs', {games: filteredGames, name: req.user.username})
        }
        catch(err){
            console.log(err)
        }
    },
    // getGameProfile:(req,res)=>{
    //     let name = req.params.gameName
    //     fetch(`https://api.rawg.io/api/games?key=${process.env.RAWGAPIKEY}&search=${name}&search_exact=true`,{
    //         method: 'get',
    //         headers: {'Content-Type':'application/json'},
            
    //     })
    //         .then(result => result.json())
    //         .then(data =>{
    //             console.log(data.results)
                
    //             res.render('game_profile.ejs', {game: data, name: req.user.username})
    //         })
    //         .catch(err => console.error(err))
    // },  
    getGameProfile: async(req,res) =>{
        try{
            let name = req.params.gameName
            let response = await axios.get(`https://api.rawg.io/api/games/${name}?key=${process.env.RAWGAPIKEY}`,{
                headers: {'Content-Type': 'application/json'}
            })
            console.log(name)
            console.log(response)
            const filteredGames = response.data
            res.render('game_profile.ejs', {game: filteredGames, name: req.user.username})
        }
        catch(err){
            console.log(err)
        }
    },
    addGame: async(req,res) => {
        const gameToAdd = { gameName:req.body.slug, hoursPlayed:req.body.hoursPlayed}
        try{
            await User.updateOne({username: req.user.username}, {$push:{games: gameToAdd}})
            console.log('added game to user')
            res.redirect(`/games/profile/added/${req.body.slug}`)
        }
        catch(err){
            console.log(err)
        }
    },
    getGameFriendList: async(req,res) =>{
        try{
            let name = req.params.gameName
            let response = await axios.get(`https://api.rawg.io/api/games/${name}?key=${process.env.RAWGAPIKEY}`,{
                headers: {'Content-Type': 'application/json'}
            })
            console.log(name)
            console.log(response)
            const hours = req.user.games.find(e=>{
                return e.gameName == name 
            })
            console.log(hours.hoursPlayed)
            const filteredGames = response.data
            const users = await User.find()
            const filteredUsers = users.filter(e=>{
                return e.games.some(e => {
                    return e.gameName == name && e.hoursPlayed < 1.2 * hours.hoursPlayed || e.hoursPlayed > .8 * hours.hoursPlayed
                })
            })
            console.log(filteredUsers)
            
            
            res.render('game_friends.ejs', {game: filteredGames, users: filteredUsers, name: req.user.username})
        }
        catch(err){
            console.log(err)
        }
    },
    
    
}