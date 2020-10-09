import React from 'react'
import { Container, Button } from 'react-bootstrap'
import './ChatPage.css'

const ChatPage = (props) => {

    return (
        <div className='chat-page'>
            <Button className='chat-button'>
                Connect with a random user
            </Button>
            <Button className='chat-button'>
                Join ChatRoom
            </Button>
            <Button className='chat-button'>
                Create ChatRoom
            </Button>
        </div>
    )
}

export default ChatPage