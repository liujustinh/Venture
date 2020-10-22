const User = require('../models/user')
const Chat = require('../models/chat')
const Message = require('../models/message')
const { create } = require('../models/user')

let users = []

const verifyUser = async (uid) => {
    try {
        const user = await User.findById(uid)
        if (!user) {
            return false
        }
        return user
    }
    catch (exception) {
        console.log(exception)
    }
}

const queueUser = async (uid) => {
    try {
        const user = verifyUser(uid)
        if (!user) {
            return false
        }
        users.concat(user)
        console.log(`Added user, ${user.username}, to queue`)
    }
    catch (exception) {
        console.log(exception)
    }
}

const createRoom = async ({uid, roomName}) => {
    try {
        const user = await User.findById(uid)
        const newChat = new Chat({
            name: roomName,
            admin: user._id,
            participants: [user._id],
        })
        const savedChat = await newChat.save()
        return savedChat
    }
    catch (exception) {
        console.log(exception)
    }
}

const joinRoom = async ({uid, roomName}) => {
    try {
        const existingChat = createRoom({uid, roomName})
        if (existingChat) {
            let updatedParticipants = existingChat.participants
            updatedParticipants = updatedParticipants.concat(uid)
            existingChat.participants = updatedParticipants
            const updatedChat = await existingChat.save()
        }
    }
    catch (exception) {
        console.log(exception)
    }
}

const getRoomByID = async ({roomID}) => {
    try {
        const chatRoom = await Chat.findById(roomID)
        if (chatRoom) {
            return chatRoom.name;
        }
    }
    catch(exception) {
        console.log(exception)
    }
}

const saveMsg = async ({uid, roomID, message}) => {
    try {
        const user = await User.findById(uid)
        const chatroom = await Chat.findById(roomID)
        const receivers = chatroom.participants.filter(participant => participant._id !== uid)
        console.log('receivers: ', receivers)
        const newMsg = new Message({
            content: message,
            sender_name: user.username,
            sender: user._id,
            receivers: receivers,
            chatRoom_id: chatroom._id,
        })
        const savedMsg = await newMsg.save()
        return savedMsg
    }
    catch (exception) {
        console.log(exception)
    }
}





module.exports = {
    verifyUser,
    queueUser,
    createRoom,
    joinRoom,
    saveMsg,
    getRoomByID
}