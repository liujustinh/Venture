import React from 'react'
import { Form,Button } from 'react-bootstrap'
import { useField } from '../../hooks/useField'
import { useHistory } from 'react-router-dom'
import loginService from '../../services/login'
import tokenService from '../../services/jwt'
import {Container} from 'react-bootstrap'
import './LoginForm.css'

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
            window.localStorage.setItem('loggedUser', user.username)
            window.localStorage.setItem('userID', user.uid)
            window.localStorage.setItem('userToken', `bearer ${user.token}`)
            console.log('userToken: ', window.localStorage.getItem('userToken'))
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
        <Container className='login-form'>
            <Form onSubmit={handleLogin}>
                <h1 className='form-title'>
                    Member Login
                </h1>
                <Form.Group controlId='formBasicUsername'>
                    <Form.Label style={{fontFamily: "“Helvetica Neue”, Helvetica, Arial, sans-serif"}}>Username</Form.Label>
                    <Form.Control {...username} placeholder='Enter username'/>
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label style={{fontFamily: "“Helvetica Neue”, Helvetica, Arial, sans-serif"}}>Password</Form.Label>
                    <Form.Control {...password} placeholder='Password'/>
                </Form.Group>
                <Button variant='primary' type='submit' className='form-button'>Login</Button>
            </Form>
        </Container>
    )
}

export default LoginForm
//<Button variant='secondary' type='button' onClick={resetForm}>Clear</Button>