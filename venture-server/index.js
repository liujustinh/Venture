const app = require('./app')
const socketio = require('socket.io')
const http = require('http')
const config = require('./utils/config')
const socketHelper = require('./utils/socket_helper')


const server = http.createServer(app)
const io = socketio(server)
let clients = []


io.on('connect', (socket) => {
    clients.concat(socket.id)
    console.log('Client connected', clients)

    socket.on('join-random', ({ username, uid }, callback) => {
        console.log('Join random: ', username)
        
    })

    /*socket.on('create-room', ({ username, uid, room }, callback) => {
        console.log('Create room:', username, room)
        socket.join(room)
    })*/

    socket.on('join-create-room', ({ username, uid, room }, callback) => {
        console.log('Join room: ', username, room)
        socketHelper.joinRoom({uid, room})
        socket.join(room)
    })

    socket.on('send-message', ({ username, uid, room, message }, callback) => {
        console.log('Send message: ', username, room, message)
        socketHelper.saveMsg({uid, room, message})
        io.to(room).emit('message', {user: username, message: message, room: room})
    })


    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})