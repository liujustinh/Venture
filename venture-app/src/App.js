import React, { useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm/LoginForm'
import NavigationBar from './components/NavigationBar/NavigationBar'
import ChatPage from './components/ChatPage/ChatPage'
import MessagesPage from './components/MessagesPage/MessagesPage'
import io from 'socket.io-client'

import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch, useHistory
} from 'react-router-dom'
import RegisterForm from './components/RegisterForm/RegisterForm';

let socket

function App() {
  const [user, setUser] = useState(null)
  const loggedUser = window.localStorage.getItem('loggedUser')
  const dispatch = useDispatch()

  return (
    <div>
        <NavigationBar user={user}></NavigationBar>
        <Switch>
          <Route path='/login'>
            <LoginForm setUser={setUser}/>
          </Route>
          <Route path='/register'>
            <RegisterForm/>
          </Route>
          {loggedUser && <Route path='/chat'>
            <ChatPage/>
          </Route>}
          {loggedUser && <Route path='/messages'>
            <MessagesPage/>
          </Route>}
          {loggedUser && <Route path='/'>
            Welcome
            <ChatPage/>
          </Route>}
        </Switch>
    </div>
  );
}

export default App;
