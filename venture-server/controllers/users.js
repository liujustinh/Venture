const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


const validateReqBody = (body) => {
    //CHECK 
    if (!body.username || !body.password) {
        return response.status(400).json({
            error: 'Username or password missing'
        })
    }
    //PARSE USERNAME
    if (body.username.length < 6) {
        return response.status(422).json({
            error: 'Username must be at least 6 characters long'
        })
    }
    //PARSE PASSWORD
    if (body.password.length < 5) {
        return response.status(400).json({
            error: 'Password must be at least 5 characters long'
        })
    }
}

//SEND MESSAGES TO USER (CURRENTLY BROKEN BC TOOK MESSAGE ARRAY OUT OF USERS)
usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('messages', {
            content: 1,
            sender: 1,
            receiver: 1,
            date: 1
        })
        response.json(users)
    }
    catch(exception) {
        next(exception)
    }
})

//CREATE NEW USER
usersRouter.post('/', async (request, response, next) => {
    try {
        const body = request.body
        validateReqBody(body)
    
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
        const user = new User({
            username: body.username,
            passwordHash,
            displayName: body.username,
        })
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    }
    catch(exception) {
        next(exception)
    }
})


module.exports = usersRouter