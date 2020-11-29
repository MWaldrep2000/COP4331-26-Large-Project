import React, { useState } from 'react';

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

        event.preventDefault();        
        var obj = {login:loginName.value,password:loginPassword.value};        
        var js = JSON.stringify(obj);        
        
        try {               
            const response = await fetch(buildPath('api/login'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});        
            var res = JSON.parse(await response.text());
            if( res.Flag <= 0 ) {                
                setMessage('User/Password combination incorrect');            
            } else if(res.Validated === 0) {            
                setMessage('');               
                window.location.href = '/validate'; 
            } else {     
                // Temporary user display          
                var user = {Email:res.Email,ID:res.ID, Username:loginName.value};           
                localStorage.setItem('user_data', JSON.stringify(user));                
                setMessage('');               
                window.location.href = '/home';            
            }        
        } catch(e) {            
            alert(e.toString());            
            return;        
        }        
    }; 

    return (    
        <div>
            <form className="login-form" onSubmit={ doLogin }>
                <input className="form-input" type="text" id="loginName" placeholder="Username"   ref={(c) => loginName = c} />
                <input className="form-input" type="password" id="loginPassword" placeholder="Password"   ref={(c) => loginPassword = c} />
                <span className="fpwrd-text" >Forgot Password?</span>
                <div className="loginButton">
                    <input type="submit" className="buttons" value="Login" onClick={doLogin} />       
                </div>
            </form>
            <span id="loginResult" className="login-error">{message}</span>
        </div>
    );
};

export default Login;