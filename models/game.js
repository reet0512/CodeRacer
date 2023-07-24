const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    wordIndex: {
        type: Number,
        default: 0
    },
    socketId: {
        type: String
    },
    isLeader: {
        type: Boolean,
        default: false
    },
    WPM: {
        type: Number,
        default: -1
    }
})

const gameSchema = new mongoose.Schema({
    words: {
        type: [String]
    },
    open: {
        type: Boolean,
        default: true
    },
    over: {
        type: Boolean,
        default: false
    },
    players: [userSchema],
    startTime: {
        type: Number 
    }
})

module.exports = mongoose.model('Game', gameSchema)