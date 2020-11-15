import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import CreateGroup from './pages/CreateGroup';
import MyGroups from './pages/MyGroups';
import SearchGroups from './pages/SearchGroups.js';
import MyIssues from './pages/MyIssues';



function App() {

    const [state, setState] = useState(true);
    const [message, setMessage] = useState('New User? Register Here!');




    const handleClick = (e) => {
        setState(!state);
        formMessage();
    }

    const formMessage = (e) => {
        (state === true) ? setMessage('Return to Login') : setMessage('New User? Register Here!');
    }


    return (
        <Router >
            <Switch>
                {/* <div className="page-div"> */}
                    <Route path="/" exact>
                        <div className="login-box">
                            <div className="logo"></div>
                            <div className="login-div">
                                <LoginPage state={state} />
                                <p className="register-click" onClick={handleClick}>{message}</p>
                            </div>
                        </div>
                    </Route>
                    <Route path="/home" exact>
                        <HomePage /> 
                    </Route>
                    <Route path="/createGroup" exact>
                        <CreateGroup /> 
                    </Route>
                    <Route path="/issues" exact>
                        <MyIssues /> 
                    </Route>
                    <Route path="/myGroups" exact>
                        <MyGroups /> 
                    </Route>
                    <Route path="/search" exact>
                        <SearchGroups /> 
                    </Route>
                {/* </div> */}
            </Switch>
        </Router>
    );
  }
export default App;