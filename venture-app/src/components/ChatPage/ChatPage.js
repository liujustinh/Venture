import React from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { useField } from '../../hooks/useField'
import { Link, useHistory } from 'react-router-dom'
import tokenService from '../../services/jwt'
import chatService from '../../services/chats'
import './ChatPage.css'

const ChatPage = (props) => {
    const [newRoomName, setNewRoomName] = useField('text')
    const [oldRoomName, setOldRoomName] = useField('text')
    const history = useHistory()

    const handleJoinRoom = async (e) => {
        e.preventDefault()
        if (!oldRoomName.value || oldRoomName.value.length == 0) {
            console.log('Room name missing!')
            return
        }
        try {
            console.log(`Attempting to join room: ${oldRoomName.value}`)
            const username = window.localStorage.getItem('loggedUser')
            const roomID = await chatService.joinChat({room: oldRoomName})
            setOldRoomName('')
            history.push(`/messages?name=${username}&roomID=${roomID}`)
        }
        catch(exception) {
            console.log(exception)
        }
    }

    const handleCreateRoom = async (e) => {
        e.preventDefault()
        if (!newRoomName.value || newRoomName.value.length == 0) {
            console.log('Room name missing!')
            return
        }
        try {
            console.log(`Attempting to create room: ${newRoomName.value}`)
            const username = window.localStorage.getItem('loggedUser')
            const chat = {
                name: newRoomName,
            }
            const roomID = await chatService.createChat(chat)
            setNewRoomName('')
            history.push(`/messages?name=${username}&roomID=${roomID}`)
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
            <Form onSubmit={handleJoinRoom} className='chat-button'>
                <Form.Group controlId='formBasicUsername'>
                    <Form.Control {...oldRoomName} placeholder='Enter room name'/>
                </Form.Group>
                    <Button type='submit'>
                        Join ChatRoom
                    </Button>
            </Form>
            <Form onSubmit={handleCreateRoom} className='chat-button'>
                <Form.Group controlId='formBasicUsername'>
                    <Form.Control {...newRoomName} placeholder='Enter room name'/>
                </Form.Group>
                    <Button type='submit'>
                        Create ChatRoom
                    </Button>
            </Form>
        </div>
    )
}

export default ChatPage