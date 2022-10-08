const mongoose = require('mongoose')

const FriendCodeSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    nintendo:{
        type: String,
        required: false,
    },
    playstation:{
        type:String,
        required: false,
    },
    xbox:{
        type: String,
        required: false,
    },
    steam:{
        type:String,
        required: false,
    },
})

module.exports = mongoose.model('FriendCode', FriendCodeSchema)