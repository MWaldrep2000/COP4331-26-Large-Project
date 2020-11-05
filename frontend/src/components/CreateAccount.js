import React, { useState } from 'react';

function Register() {
    var createUsername, createPassword;

    const [message, setMessage] = useState('');

    const doCreation = async event => {     
        
        
        event.preventDefault();        
        //once API is created, change "login" and "password" to their respective names
        var obj = {username:createUsername.value,password:createPassword.value};        
        var js = JSON.stringify(obj);        
        
        try {                
            // const response = await fetch('http://localhost:5000/api/register', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});            
            // var res = JSON.parse(await response.text());
            setMessage('');               
            window.location.href = '/home';            
                
        } catch(e) {            
            alert(e.toString());            
            return;        
        }        
    }; 

    return (
        <div id="registerDiv">

            <form className="register-form" onSubmit={ doCreation }>
                <input className="form-input" type="text" id="username" placeholder="Username"   ref={(c) => createUsername = c} />
                <input className="form-input" type="text" id="email" placeholder="Email" />
                <input className="form-input" type="password" id="password" placeholder="Password"   ref={(c) => createPassword = c} />
                <div className="registerButton">
                    <input className="buttons" type="submit" id="loginButton" class="buttons" value="Create Account" onClick={doCreation} />       
                </div>
            </form>
        </div>
    );
}

export default Register; 