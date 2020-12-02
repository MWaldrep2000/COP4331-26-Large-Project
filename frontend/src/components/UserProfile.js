import React, { Component, useState } from 'react';

class UserProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            numberGroups: 0,
            numberIssues: 0,
        }
    }

    async componentWillMount() {

        const app_name = 'hivemindg26';
        function buildPath(route)
        {
            if (process.env.NODE_ENV === 'production') 
            {
                return 'https://' + app_name +  '.herokuapp.com/' + route;
            }
            else
            {        
                return 'http://localhost:5000/' + route;
            }
        }

        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var obj = {flag:1, userID:ud.ID};        
        var js = JSON.stringify(obj);  
        const response = await fetch(buildPath('api/readGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});
        var res = JSON.parse(await response.text());

        var obj2 = {username:ud.Username};        
        var js2 = JSON.stringify(obj2);  
        const response2 = await fetch(buildPath('api/readAllIssues'), {method:'POST',body:js2,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});
        var res2 = JSON.parse(await response2.text());


        var groupNames = [];
        groupNames = res.Results;
        this.setState({
            numberGroups: res.Results.length,
            numberIssues: res2.Results.length,
        })

    }

    render() {
        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var name = ud.Username;


        // var user ={}
        const doLogout = event => {
            event.preventDefault();
            localStorage.removeItem("user_data")
            window.location.href = '/';  
        };

        return (    
            <div className="profile-div">
                <div id="loggedInDiv" className="loggedInDiv">
                    <span id="userName" className="loggedInName">Welcome  {name}, to the Hivemind.</span>
                </div>
                <button type="button" id="logoutButton" className="logoutButton" onClick ={doLogout}> Log Out </button>
                <div className="profile-text">
                    <p>Welcome to Hivemind, the best place to request assisstance in solving any issues you may have.</p>
                    <p>You can create, search or join groups. Once in a group you can post or reply to any issues other users might have.</p>
                    <br/>
                    <p>Number of groups you are a part of: <b>{this.state.numberGroups}</b></p>
                    <br/>
                    <p>Number of issues you have created: <b>{this.state.numberIssues}</b></p>
                </div>
            </div>
        );
    }
};

export default UserProfile;