import { List } from '@material-ui/core'
import React from 'react'
import { ListGroup, Badge } from 'react-bootstrap'
import './ChatList.css'

const ChatList = ({chats}) => {
    const username = window.localStorage.getItem('loggedUser')

    return (
        <ListGroup as='ul' className='sidebar'>
            <ListGroup.Item disabled>Chatroom List</ListGroup.Item>
            {chats.map(chat => <ListGroup.Item key={chat.id} action href={`/messages?name=${username}&roomID=${chat.id}`}>
                {chat.name}
                <Badge className='online-badge' variant='primary'>{chat.last_message}</Badge>
            </ListGroup.Item>)}
        </ListGroup>
    )
}

export default ChatList