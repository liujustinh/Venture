const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: "Users"}],
    last_message: Number,
    _id: {type: mongoose.Schema.ObjectId}
})

chatSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Chat', chatSchema)