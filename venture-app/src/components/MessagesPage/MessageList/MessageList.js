import React from 'react'
import Message from './Message/Message'
import ScrollToBottom from 'react-scroll-to-bottom'
import './MessageList.css'

const MessageList = ({messages}) => {
    return (
        <ScrollToBottom className='messageList'>
            {messages.map(message => <Message key={message.id} message={message}/>)}
        </ScrollToBottom>
    )
}



export default MessageList