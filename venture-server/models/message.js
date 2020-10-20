const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)

const messageSchema = new mongoose.Schema({
    content: {
        type: String, 
        required: true
    },
    sender_name : {
        type: String,
        required: true,
        unique: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    receivers: [{
        user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}, seen: Boolean
    },],
    chatRoom_id: {
        type: mongoose.Schema.ObjectId, ref: "Chat",
        required: true
    },
    date: {
        type: Date,
        default: Date.now, 
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