const messagesRouter = require('express').Router()
const Message = require('../models/message')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

messagesRouter.get('/', async (request, response, next) => {
  try {
    const messages = await Message.find({}).populate("user", {
      username: 1,
      displayName: 1,
    })
    response.json(messages.map((message) => message.toJSON()));
  } catch (error) {
      next(error);
  }
})
  
messagesRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token
  console.log(`token: ${token}`)
  if (body.content == null || body.sender == null || body.receivers || body.chatRoom_id) {
    return response.status(400).json({
      error: 'MESSAGE_ERROR_CREATION:content, sender, or receivers missing'
    })
  }
  try {
    if (!token) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const message = new Message({
      content: body.content,
      sender: body.sender,
      receivers: body.receivers,
      chatRoom_id: body.chatRoom_id,
      date: new Date()
    })

    const savedMessage = await message.save()
    user.messages = user.messages.concat(savedMessage._id)
    await user.save()
    await savedMessage
      .populate({ path: "user", select: ["displayName", "username"]})
      .execPopulate()
    response.status(201).json(savedMessage.toJSON())
    }
    catch(exception) {
      next(exception)
    }
})

messagesRouter.delete('/:id', async (request, response, next) => {
  const token = request.token
  try {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
      }

      const msgToBeDeleted = await Message.findById(request.params.id)
      if (!msgToBeDeleted) {
        return response.status(404).json({
          error: 'blog not found'
        })
      }
	  if (typeof msgToBeDeleted.sender === 'undefined') {
		return response.status(401).json({ error: 'forbidden access' })
	  }
      const belongsToUser = msgToBeDeleted.sender.toString() === decodedToken.id
      if (belongsToUser) {
        await msgToBeDeleted.remove()
        return response.status(204).end()    
      }
  }
  catch(exception) {
    return next(exception)
  }
})
  
  
module.exports = messagesRouter