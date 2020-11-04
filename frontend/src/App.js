import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';


function App() {

    const [state, setState] = useState(true);

    const handleClick = (e) => {
        setState(!state);
    }

    return (
        <Router >
            <Switch>
                <Route path="/" exact>
                    <LoginPage state={state} />
                    <p onClick={handleClick}>Click Here to Register</p>
                </Route>
                <Route path="/home" exact>
                    <HomePage /> 
                </Route>
            </Switch>
        </Router>
    );
  }
export default App;