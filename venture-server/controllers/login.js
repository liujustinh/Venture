const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (body.username === null || body.password === null) {
        return response.status(401).json({error: 'invalid username or password'})
    }
    try {
        console.log(`username: ${body.username}, password: ${body.password}`)
        const user = await User.findOne({ username: body.username })
		if (!user) {
		  return response.status(401).json({error: 'invalid username or password'})
		}
        const passwordCorrect = await bcrypt.compare(body.password, user.passwordHash)

        if (!(user && passwordCorrect)) {
            return response.status(401).json({
            error: 'invalid username or password'
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id,
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        response
            .status(200)
            .send({ token, username: user.username, uid: user._id })
    }
    catch(exception) {
        next(exception)
    }

})

module.exports = loginRouter