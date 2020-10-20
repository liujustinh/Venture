import React, { useState, useEffect} from 'react'
import queryString from 'query-string'
import chatService from '../../services/chats'
import messageService from '../../services/messages'
import { useField } from '../../hooks/useField'
import ChatList from './ChatList'
import MessageList from './MessageList/MessageList'
import Message from './MessageList/Message/Message'

const MessagesPage = () => {
    const [chats, setChats] = useState([])
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])

    useEffect( () => {
        const { name, roomID } = queryString.parse(window.location.search)
        messageService.getAll(roomID).then(messages => setMessages(messages))
        chatService.getAll().then(chats => setChats(chats))
    }, [])


    return (
        <div>
            <ChatList chats={chats}/>
            <MessageList messages={messages}/>
        </div>
    )
}

export default MessagesPage