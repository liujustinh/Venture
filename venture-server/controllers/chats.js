const chatsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Chat = require('../models/chat')
const Message = require('../models/message')
const User = require('../models/user')

chatsRouter.get('/', async (request, response, next) =>{
    const body = request.body
    const token = request.token
    try {
        if (!token) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }
        
    }
    catch (exception) {
        console.log(exception)
    }
})

module.exports = chatsRouter