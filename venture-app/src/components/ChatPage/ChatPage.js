import React from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { useField } from '../../hooks/useField'
import { Link, useHistory } from 'react-router-dom'
import tokenService from '../../services/jwt'
import './ChatPage.css'

const ChatPage = (props) => {
    const [roomName, resetRoomName] = useField('text')
    const history = useHistory()

    const handleJoin = async (e) => {
        e.preventDefault()
        if (!roomName.value || roomName.value.length == 0) {
            console.log('Room name missing!')
            return
        }
        try {
            console.log(`Attempting to join room: ${roomName.value}`)
            const username = window.localStorage.getItem('loggedUser')
            history.push(`/messages?name=${username}&room=${roomName.value}`)
        }
        catch(exception) {
            console.log(exception)
        }
    }

    return (
        <div className='chat-page'>
            <Button className='chat-button'>
                Connect with a random user
            </Button>
            <Form onSubmit={handleJoin} className='chat-button'>
                <Form.Group controlId='formBasicUsername'>
                    <Form.Control {...roomName} placeholder='Enter room name'/>
                </Form.Group>
                    <Button type='submit'>
                        Join/Create ChatRoom
                    </Button>
            </Form>
        </div>
    )
}

export default ChatPage