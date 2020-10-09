import React from 'react'
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap'
import { BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useHistory} from 'react-router-dom'

const NavigationBar = (props) => {
    const user = window.localStorage.getItem('loggedUser')

    const handleLogout = (e) => {
        window.localStorage.clear()
    }
    return (
        <Navbar expand='lg' bg='dark' variant='dark'>
            <Navbar.Brand href="/">Venture</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                {!user && <Nav>
                    <Nav.Link href='/login'>
                        Login
                    </Nav.Link>
                    <Nav.Link href='/register'>
                        Register
                    </Nav.Link>
                </Nav>}
                {user && <Nav>
                    <Nav.Link href='/chat'>
                        Chat
                    </Nav.Link>
                    <Nav.Link href='/messages'>
                        Messages
                    </Nav.Link>
                    <Nav.Link href='/' onClick={handleLogout}>
                        Log out
                    </Nav.Link>
                </Nav>}
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavigationBar

//{user && <Nav className='container-fluid'>
//<Nav.Link className='ml-auto' href='/' onClick={handleLogout}>