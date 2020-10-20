import React from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import { useField } from '../../hooks/useField'
import { useHistory } from 'react-router-dom'
import userService from '../../services/users'
import './RegisterForm.css'

const RegisterForm = (props) => {
    const [username, resetUsername] = useField('text')
    const [password, resetPassword] = useField('text')
    const [confirmPassword, resetConfirmPassword] = useField('text')
    const history = useHistory()

    const resetForm = () => {
        resetUsername()
        resetPassword()
        resetConfirmPassword()
    }

    const handleCreateUser = async (e) => {
        e.preventDefault()
        if (username.value.length === 0 || password.value.length === 0) {
            console.log('Username or password missing')
            return
        }
        if (password.value !== confirmPassword.value) {
            console.log('Passwords do not match up')
            resetPassword()
            resetConfirmPassword()
            return
        }
        try {
            console.log(`Username: ${username.value}  Password: ${password.value}`)
            const user = await userService.createUser({username: username.value, password: password.value})
            resetForm()
            history.push('/login')
        }
        catch (exception) {
            console.log(exception)
        }
    }

    return (
        <Container className='form-page'>
            <Form onSubmit={handleCreateUser}>
                <h1 className='form-title'>
                    Register
                </h1>
                <Form.Group controlId='formBasicUsername'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control {...username} placeholder='Enter username'/>
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control {...password} placeholder='Password'/>
                </Form.Group>

                <Form.Group controlId='formBasicPassword'>
                    <Form.Label>Re-Enter Password</Form.Label>
                    <Form.Control {...confirmPassword} placeholder='Password'/>
                </Form.Group>
                <Button className='form-button' variant='primary' type='submit'>Create</Button>
            </Form>
        </Container>
    )
}

export default RegisterForm