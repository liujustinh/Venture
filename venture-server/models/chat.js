const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const chatSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true
    },
    admin: {type: mongoose.Schema.Types.ObjectId, ref: "Users"},
    participants: [{type: mongoose.Schema.Types.ObjectId, ref: "Users"}],
    last_message: Number,
})

chatSchema.plugin(uniqueValidator)

chatSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Chat', chatSchema)