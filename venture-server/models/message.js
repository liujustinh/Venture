const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const messageSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    date: {
        type: Date, 
        required: true
    }
})

messageSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Message', messageSchema)