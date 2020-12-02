import React, { useState } from 'react';

function UserProfile() {

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
                <p>Number of groups you are a part of: XX</p>
                <br/>
                <p>Number of issues you have created: XX</p>
            </div>
        </div>
    );
};

export default UserProfile;