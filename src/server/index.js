'use strict'
/**
 * Created by Capricorncd.
 * https://github.com/capricorncd
 * Date: 2020-07-31 21:56
 */
const http = require('http')
// const https = require('https')
// const fs = require('fs')

const express = require('express')
const serveIndex = require('serve-index')
const socketIO = require('socket.io')
const log4js = require('log4js')

const log4jsConfig = require('./log4js-config')

log4js.configure(log4jsConfig)

const logger = log4js.getLogger()

const PUBLIC_DIR = './public'
const HTTP_PORT = 8080
const HTTPS_PORT = 443
const LOCAL_IP = '0.0.0.0'

const app = express()
app.use(serveIndex(PUBLIC_DIR))
app.use(express.static(PUBLIC_DIR))

// http server
const httpServer = http.createServer(app)
// bind io with httpServer
const io = socketIO.listen(httpServer)
httpServer.listen(HTTP_PORT, LOCAL_IP)

io.sockets.on('connection', socket => {
  // join room
  socket.on('join', room => {
    socket.join(room)
    const currentRoom = io.sockets.adapter.rooms[room]
    const userTotal = Object.keys(currentRoom.sockets).length
    logger.log('the number of user in room is: ' + userTotal)
    // reply current user, the success joined in room
    // socket.emit('joined', room, socket.id)
    // reply all users who in this room, but is not this user
    // socket.to(room).emit('joined', room, socket.id)
    // reply all users who in this room, and this user
    // io.in(room).emit('joined', room, socket.id)
    // reply all users who in this socket
    socket.broadcast.emit('joined', room, socket.id)
  })
  // leave room
  socket.on('leave', room => {
    socket.leave(room)
    const currentRoom = io.sockets.adapter.rooms[room]
    const userTotal = Object.keys(currentRoom.sockets).length
    logger.log('the number of user in room is: ' + userTotal)
    // reply current user, leaved room
    // socket.emit('leaved', room, socket.id)
    // reply all users who leaved this room
    // socket.to(room).emit('leaved', room, socket.id)
    // reply all users who leaved this room, and this user
    // io.in(room).emit('leaved', room, socket.id)
    // reply all users who leaved this socket
    socket.broadcast.emit('leaved', room, socket.id)
  })
})

// // https cert
// const httpsOptions = {
//   key: fs.readFileSync('./cert/it-factory.co.key'),
//   cert: fs.readFileSync('./cert/it-factory.co.pem')
// }
// // https server
// const httpsServer = https.createServer(httpsOptions, app)
// const io = socketIO.listen(httpsServer)
// httpsServer.listen(HTTPS_PORT, LOCAL_IP)
