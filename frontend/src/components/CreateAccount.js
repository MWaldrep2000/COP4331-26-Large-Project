
import React, { useState } from 'react';

function Register() {
    var createUsername, createPassword, createEmail, confirmPassword;

    const [message, setMessage] = useState('');



    const doCreation = async event => {
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

        
        event.preventDefault();        
        //once API is created, change "login" and "password" to their respective names
        
        var md5 = require('md5');
        var hashedPassword = md5(createPassword.value);

        var obj = {username:createUsername.value,password:hashedPassword,email:createEmail.value};        
        var js = JSON.stringify(obj);        
        
        if (createPassword.value !== confirmPassword.value) {
            setMessage("Passwords don't match.");
            return;
        } 
        else
        {
            try {                
                var _ud = localStorage.getItem('user_data');
                var ud = JSON.parse(_ud);
                const response = await fetch(buildPath('api/register'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});            
                var res = JSON.parse(await response.text());
                
                if (res.Error !== "Registration Complete") {
                    setMessage(res.Error); 
                } else {                
                    setMessage(res.Error);               
                    window.location.href = '/';
                }
                    
            } catch(e) {            
                alert(e.toString());            
                return;        
            }
        }        
    }; 

    return (
        <div id="registerDiv">

            <form className="register-form">
                <input className="form-input" type="text" id="username" placeholder="Username"   ref={(c) => createUsername = c} />
                <input className="form-input" type="text" id="email" placeholder="Email"  ref={(c) => createEmail = c}/>
                <input className="form-input" type="password" id="password" placeholder="Password"   ref={(c) => createPassword = c} />
                <input className="form-input" type="password" id="password" placeholder="Confirm Password"   ref={(c) => confirmPassword = c} />
                <div className="registerButton">
                    <input className="buttons" type="submit" id="loginButton" class="buttons" value="Create Account" onClick={doCreation} />       
                </div>
                <span id="registerResult" className="register-error">{message}</span>
            </form>
        </div>
    );
}

export default Register; 