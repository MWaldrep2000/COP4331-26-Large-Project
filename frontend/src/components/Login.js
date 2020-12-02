import React, { useState } from 'react';
import Cookies from 'universal-cookie';

function Login() {

    var loginName, loginPassword;

    const [message, setMessage] = useState('');

    const doLogin = async event => {     
        
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

        var md5 = require('md5');
        var hashedPassword = md5(loginPassword.value);

        event.preventDefault();        
        var obj = {login:loginName.value,password:hashedPassword};        
        var js = JSON.stringify(obj);        
        
        try {               
            const response = await fetch(buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'WithCredentials' : true}});        
            var res = JSON.parse(await response.text());
            if( res.Flag <= 0 ) {                
                setMessage('User/Password combination incorrect');            
            } else if(res.Validated === 0) {            
                setMessage('');               
                window.location.href = '/validate'; 
            } else {     
                // Temporary user display          
                var user = {Email:res.Email,ID:res.ID, Username:loginName.value, AccessToken:res.AccessToken};   

                //This works to make a cookie, but it needs to be made in tokens.js!!!!!!!!!!!!! IDK???
                // const cookies = new Cookies();
                // cookies.set('test', 'test2', {
                //     path: '/',
                //     httpOnly: false,
                // });
                localStorage.setItem('user_data', JSON.stringify(user));                
                setMessage('');               
                window.location.href = '/home';            
            }        
        } catch(e) {            
            alert(e.toString());            
            return;        
        }        
    }; 

    const goToResetPass= () => {
        window.location.href ='/resetPassword';
    };
    
    return (    
        <div>
            <form className="login-form" onSubmit={ doLogin }>
                <input className="form-input" type="text" id="loginName" placeholder="Username"   ref={(c) => loginName = c} />
                <input className="form-input" type="password" id="loginPassword" placeholder="Password"   ref={(c) => loginPassword = c} />
                <span className="fpwrd-text" onClick={goToResetPass}>Forgot Password?</span>
                <div className="loginButton">
                    <input type="submit" className="buttons" value="Login" onClick={doLogin} />       
                </div>
            </form>
            <span id="loginResult" className="login-error">{message}</span>
        </div>
    );
};

export default Login;