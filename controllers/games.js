const axios = require('axios').default
const User = require('../models/User')
const Game = require('../models/Game')
require('dotenv').config({path: '../config/.env'})

module.exports = {
    searchGames: async(req,res) =>{
        try{
            const response = await axios.get(`https://api.rawg.io/api/games?key=${process.env.RAWGAPIKEY}&search=${req.query.gameName}&search_precise=true`)
            // console.log(response)
            const data = await response.data.results; 
            const filteredGames = await data.filter(e => e.rating >= 3)
            res.render('search.ejs', {games: filteredGames, name: req.user.username, id:req.user.discordID, avatar: req.user.avatar})
        }
        catch(err){
            console.log(err)
        }
    }, 
    getGameProfile: async(req,res) =>{
        try{
            const response = await axios.get(`https://api.rawg.io/api/games/${req.params.gameName}?key=${process.env.RAWGAPIKEY}`)
            const data = await response.data
            res.render('game_profile.ejs', {game: data, name: req.user.username, id: req.user.discordID, avatar: req.user.avatar})
        }
        catch(err){
            console.log(err)
        }
    },
    addGame: async(req,res) => {
        const hoursPlayed = +req.body.hoursPlayed
        const gameToAdd = { name:req.body.name, slug: req.body.slug, hours:hoursPlayed, userId: req.user._id, username: req.user.username, role: req.body.role}
        try{
            await Game.create(gameToAdd)
            console.log('added game')
            res.redirect(`/games/profile/added/${req.body.slug}`)
        }
        catch(err){
            console.log(err)
        }
    },
    getGameFriendList: async(req,res) =>{
        try{
            const response = await axios.get(`https://api.rawg.io/api/games/${req.params.gameName}?key=${process.env.RAWGAPIKEY}`)
            const filteredGames = await response.data
            const userGame = await Game.findOne({slug: response.data.slug, userId: req.user._id})
            const game = await Game.find({slug: response.data.slug, hours: {$gte : (.8 * userGame.hours), $lte: (1.2 * userGame.hours) }})
            const filteredUsers = game.map(el => el.username)
            const friend = game.map(el =>{
                return {username: el.username,
                friendId: el.userId}
            })
            res.render('game_friends.ejs', {game: filteredGames, users: filteredUsers,friend: friend, name: req.user.username, id: req.user.discordID, avatar: req.user.avatar})
        }
        catch(err){
            console.log(err)
        }
    },
    
    
}