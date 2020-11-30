import React, { useState } from 'react';

function ForgotPass() {

    var uEmail;

    const [message, setMessage] = useState('');

    const emailRecovery = async event => {     
        
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
        var obj = {email:uEmail.value};        
        var js = JSON.stringify(obj);        
        
        try {                
            const response = await fetch(buildPath('api/resetPasswordLink'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});        
            var res = JSON.parse(await response.text());
            if ( res.Error !== '' ) {                
                setMessage(res.Error);            
            } else {            
                setMessage("Please check your email for further instructions");               
            }        
        } catch(e) {            
            alert(e.toString());            
            return;        
        }        
    }; 

    return (    
        <div>
            <form className="login-form" onSubmit={ emailRecovery }>
                <span style={{color: "black"}}>Please enter your email, instructions on resetting your password will be sent to the account associated with it.</span>
                <hr/>
                <input className="verif-input" type="text" id="email" placeholder="Email"   ref={(c) => uEmail = c} />
                <div className="verifButton">
                    <input type="submit" className="buttons" value="Send Email" onClick={emailRecovery} />       
                </div>
                <span id="resetResult" className="reset-error" style={{color: "black"}}>{message}</span>
            </form>
        </div>
    );
};

export default ForgotPass;