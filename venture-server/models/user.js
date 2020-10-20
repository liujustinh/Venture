const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    username: {
        type: String, 
        unique: true 
    },
    passwordHash: {
        type: String 
    },
    displayName: {
        type: String 
    },
    chats: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chat" }],
    familiar_users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
});
  
userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    }
})


module.exports = mongoose.model("User", userSchema);