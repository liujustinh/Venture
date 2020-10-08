const router = require('express').Router()
const Message = require('../models/message')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
    await Message.deleteMany({})
    await User.deleteMany({})
    
    response.status(204).end()
})

module.exports = router