const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug:{
        type: String,
        required: true,
    },
    hours: {
        type: Number,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: false,
    },
})

module.exports = mongoose.model('Game', GameSchema)