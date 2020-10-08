import React from 'react'
import { Form,Button } from 'react-bootstrap'
import { useField } from '../hooks/useField'
import { useHistory } from 'react-router-dom'
import loginService from '../services/login'
import messageService from '../services/messages'
import { Next } from 'react-bootstrap/esm/PageItem'

const LoginForm = ({setUser}) => {
    const [username, resetUsername] = useField('text')
    const [password, resetPassword] = useField('text')
    const history = useHistory()

    const resetForm = () => {
        resetUsername()
        resetPassword()
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        if (username.value.length === 0 || password.value.length === 0) {
            console.log('Username or password empty')
            return
        }
        try {
            console.log(`Username: ${username.value}  Password: ${password.value}`)
            const user = await loginService.login({username: username.value, password: password.value})
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            //let jsonuser = JSON.stringify(user.username)
            //console.log(`User: ${jsonuser}`)
            messageService.setToken(user.token)
            setUser(user)
            console.log(`${username.value} logged in!`)
            resetForm()
            history.push('/')
        }
        catch(exception) {
            console.log('Invalid username or password')
            resetForm()
        }
    }

    return (
        <Form onSubmit={handleLogin}>
            <Form.Group controlId='formBasicUsername'>
                <Form.Label>Username</Form.Label>
                <Form.Control {...username} placeholder='Enter username'/>
            </Form.Group>

            <Form.Group controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control {...password} placeholder='Password'/>
            </Form.Group>
            <Button variant='primary' type='submit'>Login</Button>
            <Button variant='secondary' type='button' onClick={resetForm}>Clear</Button>
        </Form>
    )
}

export default LoginForm