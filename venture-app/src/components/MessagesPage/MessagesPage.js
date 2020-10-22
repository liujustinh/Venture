import React, { useState, useEffect} from 'react'
import queryString from 'query-string'
import chatService from '../../services/chats'
import messageService from '../../services/messages'
import { useField } from '../../hooks/useField'
import ChatList from './ChatList'
import MessageList from './MessageList/MessageList'
import Input from './Input/Input'
import io from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3003'
let socket;

const MessagesPage = () => {
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const uid = window.localStorage.getItem('userID')
    const { name, roomID } = queryString.parse(window.location.search)

    useEffect(() => {
        socket = io(SOCKET_URL)
        const { name, roomID } = queryString.parse(window.location.search)
        console.log('messages:', messages)
        if (roomID) {
            messageService.getAll(roomID).then(messages => setMessages(messages))
            socket.emit('enter-room', { name, uid, roomID })
        }
        chatService.getAll().then(chats => setChats(chats))
        socket.emit('user-info', {uid, name, roomID})
    }, [])

    useEffect(() => {
        socket.on('message', msg => {
            console.log('received messages')
            setMessages(messages => [...messages, msg])
        })
    }, [])

    const sendMessage = (event) => {
        console.log('sending message...', message)
        event.preventDefault()
        if (message) {
            socket.emit('send-message', {name, uid, roomID, message})
            setMessage('')
        }
    }

    const joinChat = (room) => {
        console.log('joinChat: ', room)
        socket.emit('enter-room', { name, uid, room })
    }


    return (
        <div>
            <ChatList chats={chats} joinChat={joinChat}/>
            {roomID && <MessageList messages={messages}/>}
            {roomID && <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />}
        </div>
    )
}

export default MessagesPage