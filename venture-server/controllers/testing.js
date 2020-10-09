const router = require('express').Router()
const Message = require('../models/message')
const User = require('../models/user')
const Chat = require('../models/chat')

router.post('/reset', async (request, response) => {
    await Message.deleteMany({})
    await User.deleteMany({})
    await Chat.deleteMany({})
    
    response.status(204).end()
})

module.exports = router