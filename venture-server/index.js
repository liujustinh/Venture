const app = require('./app')
const socketio = require('socket.io')
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(app)
const io = socketio(server)

io.on('connection', (socket) => {
    console.log('Client connected')

    socket.on('join-random', ({ username }, callback) => {
        console.log('Join random: ', username)
    })

    socket.on('create-room', ({username, room}, callback) => {
        console.log('Create room:'. username, room)
    })

    socket.on('join-room', ({ username, room }, callback) => {
        console.log('Join room: ', username, room)
    })


    socket.on('disconnect', () => {
        console.log('User disconnected')
    })
})

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})