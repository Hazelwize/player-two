const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    discordID: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    games:{
        type: Array,
        required: true,
    }

})

module.exports = mongoose.model('User', UserSchema)