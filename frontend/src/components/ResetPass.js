import React, { useState } from 'react';
import { useParams } from "react-router-dom";

function ResetPass() {

    var uPassword;
    var uConfirmPassword;

    const [message, setMessage] = useState('');
    var { uid } = useParams();

    const NewPassword = async event => {     
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
        var hashedPassword = md5(uPassword.value);
     
        event.preventDefault();        
        var obj = {userID:uid, password:hashedPassword};        
        var js = JSON.stringify(obj);        
        if(uPassword.value !== uConfirmPassword.value){
            setMessage('Passwords do not match.');
        }
        else {
            try {                
                const response = await fetch(buildPath('api/changePassword'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});        
                var res = JSON.parse(await response.text());
                if ( res.Error !== '' ) {                
                    setMessage(res.Error);    
                    window.location.href = '/';        
                } else {            
                    setMessage('');               
                }        
            } catch(e) {            
                alert(e.toString());            
                return;        
            }  
        }      
    }; 

    return (    
        <div>
            <form className="login-form">
                <span style={{color: "black"}}>Please enter your new password.</span>
                <hr/>
                <input className="verif-input" type="password" id="password" placeholder="Password"   ref={(c) => uPassword = c} />
                <input className="verif-input" type="password" id="password" placeholder="Confirm Password"   ref={(c) => uConfirmPassword = c} />
                <div className="verifButton">
                    <input type="submit" className="buttons" value="Reset Password" onClick={NewPassword} />       
                </div>
                <span id="resetResult" className="reset-error" style={{color: "black"}}>{message}</span>
            </form>
        </div>
    );
};

export default ResetPass;