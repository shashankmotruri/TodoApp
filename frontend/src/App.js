import React from 'react'
import './App.css';
import {BrowserRouter as Router , Route,Switch} from 'react-router-dom';
import Login from './components/auth/Login';
import PrivateRoute from './components/APIcalls/PrivateRoute'
import Home from './components/Home'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Login} />
        <PrivateRoute path='/home' exact component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
