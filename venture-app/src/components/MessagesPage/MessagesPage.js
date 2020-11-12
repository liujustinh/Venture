import React, { useState, useEffect} from 'react'
import queryString from 'query-string'
import chatService from '../../services/chats'
import messageService from '../../services/messages'
import { useField } from '../../hooks/useField'
import './MessagesPage.css'
import ChatList from './ChatList'
import MessageList from './MessageList/MessageList'
import Input from './Input/Input'
import ChatInfoBar from './ChatInfoBar/ChatInfoBar'
import io from 'socket.io-client'

const SOCKET_URL = 'http://localhost:3003'
let socket;

const MessagesPage = () => {
    const [chat, setChat] = useState('')
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const uid = window.localStorage.getItem('userID')
    const username = window.localStorage.getItem('loggedUser')
    const { name, roomID } = queryString.parse(window.location.search)
    const { random } = queryString.parse(window.location.search)

    //handle/maintain socket connections
    useEffect(() => {
        socket = io(SOCKET_URL)
        const { name, roomID } = queryString.parse(window.location.search)
        chatService.getAll().then(chats => setChats(chats))
        if (roomID) {
            setChat(chats.filter(chat => chat.id === roomID))
            messageService.getAll(roomID).then(messages => setMessages(messages))
            socket.emit('enter-room', { name, uid, roomID })
        }
        
        socket.emit('user-info', {uid, username, roomID})
    }, [])

    //handle new messages received from socket
    useEffect(() => {
        socket.on('message', msg => {
            console.log('received messages')
            setMessages(messages => [...messages, msg])
        })

        socket.on('joining-random', roomID => {
            console.log('joining a random chatroom')
            
        })
    }, [])

    //handle queueing with random users
    useEffect(() => {
        const { random } = queryString.parse(window.location.search)
        if (random) {
            console.log('random: ', random)
            socket.emit('join-random', {uid})
        }
    }, [])


    const sendMessage = (event) => {
        console.log('sending message...', message)
        event.preventDefault()
        if (message) {
            socket.emit('send-message', {name, uid, roomID, message})
            setMessage('')
        }
    }

    //handle putting user in chat
    const joinChat = (room) => {
        console.log('joinChat: ', room)
        socket.emit('enter-room', { name, uid, room })
    }


    return (
        <div>
            <ChatList chats={chats} joinChat={joinChat}/>
            {roomID && <div className='chatbox'>
                <ChatInfoBar chat={chat}/>
                <MessageList messages={messages}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>}
        </div>
    )
}

export default MessagesPage