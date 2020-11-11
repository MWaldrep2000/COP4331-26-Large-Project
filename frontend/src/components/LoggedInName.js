import React from 'react';

function LoggedInName (){

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
        <div id="loggedInDiv">
            <span id="userName">Welcome  {email} ID = {id}</span><br />
            <button type="button" id="logoutButton" class="buttons" onClick ={doLogout}> Log Out </button>
        </div>
    );

};

export default LoggedInName;