const app = require('./app')
const socketio = require('socket.io')
const http = require('http')
const config = require('./utils/config')
const socketHelper = require('./utils/socket_helper')


const server = http.createServer(app)
const io = socketio(server)
let clients = []
let random_clients = []

io.on('connect', (socket) => {

    socket.on('user-info', ({uid, username, roomID}, callback) => {
        //console.log('Receiving user info: ', userID, name, roomID)
        let socketID = socket.id
        if (clients.filter(client => client.uid === uid)) {
            console.log('alrdy have this client')
            clients = clients.filter(client => client.uid !== uid)
        }
        clients = clients.concat({username, uid, socketID })
        console.log('clients: ', clients)
    })

    socket.on('join-random', ({ name, uid }, callback) => {
        console.log('Join random: ', uid)
        let client = clients.filter(client => client.uid === uid)
        if (random_clients.filter(client => client.uid === uid)) {
            console.log('alrdy have this random client')
            random_clients = random_clients.filter(client => client.uid !== uid)
        }
        random_clients = random_clients.concat(client[0])
        
        console.log('random clients: ', random_clients)
    })

    socket.on('create-room', ({ name, uid, room}, callback) => {
        console.log('Create room: ', name, uid, room)
    })

    socket.on('join-room', ({ name, uid, room }, callback) => {
        console.log('Join room: ', name, room)
        socketHelper.joinRoom({uid, room})
        socket.join(room)
    })

    socket.on('enter-room', ({ name, uid, roomID}, callback) => {
        console.log('Enter room: ', name, uid, roomID)
        socket.join(roomID)
    })

    socket.on('send-message', ({ name, uid, roomID, message }, callback) => {
        console.log('Send message: ', name, uid, roomID, message)
        socketHelper.saveMsg({uid, roomID, message})
        const savedMsg = {
            content: message,
            sender_name: name,
            chatRoom_id: roomID,
            date: new Date(),
            id: Math.random().toString(36).substr(2, 9)
        }
        console.log('savedMsg: ', savedMsg)
        io.to(roomID).emit('message', savedMsg)
    })


    socket.on('disconnect', () => {
        console.log('User disconnected')
        let discSockID = socket.id
        clients = clients.filter(client => client.socketID !== discSockID)
        console.log('clients after disconnect: ', clients)
    })
})

server.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`)
})