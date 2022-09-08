const mongoose = require('mongoose')

const GameSchema = new mongoose.Schema({
    name: {
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
    }
})

module.exports = mongoose.model('Game', GameSchema)