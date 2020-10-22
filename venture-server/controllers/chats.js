const chatsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const chat = require('../models/chat')
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
    console.log('createChat token: ', token)
    try {
        if (!body.name) {
            return response.status(401).json({ error: 'failed to identify participants and chatroom name' })
        }
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)
        //console.log('creating chat: ', body.name)

        const chat = new Chat({
            name: body.name.value,
            admin: user._id,
            participants: [user._id],
            last_message: 0
        })

        const savedChat = await chat.save()
        user.chats = user.chats.concat(savedChat._id)
        await user.save()
        return response.status(201).json(savedChat._id)
    }
    catch (exception) {
        console.log(exception)
    }
})

//USER JOINING OF CHATROOMS
chatsRouter.put('/', async (request, response, next) => {
    const body = request.body
    const token = request.token
    console.log('joinChat token: ', token)
    try {
        if (!body.room.value) {
            return response.status(401).json({ error: 'failed to identify participants and chatroom name' })
        }
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        const user = await User.findById(decodedToken.id)

        const chatsToBeUpdated = await Chat.find({name: body.room.value})
        if (!chatsToBeUpdated[0]) {
            return response.status(404).json({
                error: 'chat not found'
              })
        }
        const chatToBeUpdated = chatsToBeUpdated[0]
        chatToBeUpdated.participants = chatToBeUpdated.participants.concat(user._id)
        const updatedChat = await chatToBeUpdated.save()
        return response.status(200).json(updatedChat._id)
    }
    catch (exception) {
        console.log(exception)
    }
})



module.exports = chatsRouter