const express = require('express')
const mongoose = require('mongoose')
const socketio = require('socket.io')
const Game = require('./models/game')
const promptData = require('./promptData')

const app = express()

const expressServer = app.listen(3001)
const io = socketio(expressServer, {
  cors: {
    origin: ['http://localhost:3000', 'http://localhost:3002', 'http://localhost:3003']
  }
})

mongoose.connect('mongodb://localhost/typeRacer')
const db = mongoose.connection
db.on('error', error => {
  console.error(error)
})
db.once('open', () => {
  console.log('Connected to Mongoose')
})

const calculateTime = (time) => {
  let minutes = parseInt(time / 60)
  let seconds = time % 60
  seconds = seconds < 10 ? '0' + seconds : seconds
  return (minutes + ':' + seconds)
}

const calculateWPM = (startTime, endTime, numWords) => {
  let totalTime = (endTime - startTime) / (60 * 1000)
  const WPM = parseInt(numWords / totalTime)
  return WPM
}

const startGameClock = async(gameId) => {
  let game = await Game.findById(gameId)
  game.startTime = new Date().getTime();
  game = await game.save();
  let time = 60
  let timerId = setInterval(
    function gameIntervalFunc() {
      if(time >= 0) {
        const displayTime = calculateTime(time)
        io.to(gameId).emit('timer', {countdown: displayTime, msg: "Time Remaining"})
        time--
      } else {
        (async() => {
          let endTime = new Date().getTime();
          let game = await(Game.findById(gameId))
          game.over = true
          game.players.forEach((player, index) => {
            if(player.WPM === -1)
              game.players[index].WPM = calculateWPM(game.startTime, endTime, player.wordIndex)
          })
          game = await game.save()
          io.to(gameId).emit('update-game', game)
          clearInterval(timerId)
        })()
      }
      return gameIntervalFunc;
    }(), 1000)
}

io.on('connect', (socket) => {
  socket.on('create-game', async(username) => {
    try{
      const quotableData = promptData()
      let game = new Game()
      game.words = quotableData
      let player = {
        username: username, 
        socketId: socket.id,
        isLeader: true
      }
      game.players.push(player)
      game = await game.save()
      const gameId = game._id.toString()
      socket.join(gameId)
      io.to(gameId).emit('update-game', game)
    } catch(err) {
      console.log(err)
    }
  })
  socket.on('join-game', async({username, gameId}) => {
    try{
      let game = await Game.findById(gameId)
      if(game.open) {
        socket.join(gameId)
        let player = {
          username: username,
          socketId: socket.id,
        }
        game.players.push(player)
        game = await game.save()
        io.to(gameId).emit('update-game', game)
      }
    } catch (err) {
      io.to(gameId).emit('update-game', [])
      console.log(err)
    }
  })

  socket.on('timer', async({gameId, playerId}) => {
    let countdown = 5;
    let game = await Game.findById(gameId)
    let player = game.players.id(playerId)
    if(player.isLeader) {
      let timerId = setInterval(async() => {
        if(countdown >= 0) {
          io.to(gameId).emit('timer', {countdown, msg: 'Starting Game'})
          countdown--
        } else {
          game.open = false
          game = await game.save()
          io.to(gameId).emit('update-game', game)
          await startGameClock(gameId)
          clearInterval(timerId)
        }
      }, 1000)
    }
  })

  socket.on('user-input', async({userInput, gameId}) => {
    try{
      let game = await Game.findById(gameId)
      if(!game.open && !game.over) {
        let player = game.players.find(player => player.socketId === socket.id)
        let word = game.words[player.wordIndex]
        if(word === userInput) {
          player.wordIndex++
          if(player.wordIndex != game.words.length) {
            game = await game.save()
            io.to(gameId).emit('update-game', game)
          } else {
            let endTime = new Date().getTime()
            let {startTime} = game
            player.WPM = calculateWPM(startTime, endTime, player.wordIndex)
            game = await game.save()
            socket.emit('done')
            io.to(gameId).emit('update-game', game)
          }
        }
      }
    } catch(err) {
      console.log(err)
    }
  })
})