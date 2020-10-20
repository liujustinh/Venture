const chatsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Chat = require('../models/chat')
const Message = require('../models/message')
const User = require('../models/user')

//USER LOADING CHATROOMS
chatsRouter.get('/', async (request, response, next) => {
    const token = request.token
    //console.log(token)
    console.log('getting chats')
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        //console.log(decodedToken)
        const chats = await Chat.find().where('participants').in(decodedToken.id).exec()
        //console.log(chats)
        return response.status(201).json(chats)
    }
    catch (exception) {
        console.log(exception)
    }
})

//USER CREATION OF CHATROOMS
chatsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = request.token
    try {
        if (!body.name) {
            return response.status(401).json({ error: 'failed to identify participants and chatroom name' })
        }
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        //const participants = await User.find().where('username').in(body.participants).exec()
        //const partipants_id = participants.map(participant => participant._id)
        //partipants_id.concat(decodedToken.id)
        console.log(`participants_id: ${partipants_id}`)
        const chat = new Chat({
            name: body.name,
            admin: user._id,
            //participants: partipants_id,
            last_message: 0
        })

        const savedChat = await chat.save()
        user.chats = user.chats.concat(savedChat._id)
        await user.save()
        return response.status(201).json(savedChat.toJSON())
    }
    catch (exception) {
        console.log(exception)
    }
})

module.exports = chatsRouter