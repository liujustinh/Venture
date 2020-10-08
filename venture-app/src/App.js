import React, { useState } from 'react';
import './App.css';
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'
import NavigationBar from './components/NavigationBar'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useRouteMatch, useHistory
} from 'react-router-dom'
import RegisterForm from './components/RegisterForm';

function App() {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()

  return (
    <div>
      <NavigationBar user={user}></NavigationBar>
      <Switch>
        <Route path='/login'>
          <LoginForm setUser={setUser}></LoginForm>
        </Route>
        <Route path='/register'>
          <RegisterForm></RegisterForm>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
