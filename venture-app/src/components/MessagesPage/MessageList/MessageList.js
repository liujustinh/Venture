import React from 'react'
import Message from './Message/Message'
import ScrollToBottom from 'react-scroll-to-bottom'
import './MessageList.css'
import {Container} from 'react-bootstrap'

const MessageList = ({messages}) => {
    return (
        <div>
        <ScrollToBottom className='messageList'>
            {messages.map(message => <div key={message.id}><Message message={message}/></div>)}
        </ScrollToBottom>
        </div>
    )
}



export default MessageList