import React, { useState } from 'react';

function UserProfile() {

    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var id = ud.ID;
    var email = ud.Email;


    // var user ={}
    const doLogout = event => {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';  
    };

    return (    
        <div className="profile-div">
            <div id="loggedInDiv" className="loggedInDiv">
                <span id="userName" className="loggedInName">Welcome  {email} ID = {id}</span>
            </div>

            <button type="button" id="logoutButton" className="logoutButton" onClick ={doLogout}> Log Out </button>
        </div>
    );
};

export default UserProfile;