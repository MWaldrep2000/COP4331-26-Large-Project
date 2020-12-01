import React, { useState } from 'react';

function Verify() {

    var loginName, verifCode;

    const [message, setMessage] = useState('');

    const doVerification = async event => {     
        
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
        var obj = {username:loginName.value,validationcode:verifCode.value};        
        var js = JSON.stringify(obj);        
        
        try {                
            const response = await fetch(buildPath('api/validateCode'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});        
            var res = JSON.parse(await response.text());
            if ( res.Error === "User not found" ) {                
                setMessage(res.Error);            
            } else if (res.Error === "Incorrect validation code") {            
                setMessage(res.Error);               
            } else if (res.Error === "Validation success"){               
                setMessage('');               
                window.location.href = '/';            
            }        
        } catch(e) {            
            alert(e.toString());            
            return;        
        }        
    }; 

    return (    
        <div>
            <form className="login-form" onSubmit={ doVerification }>
                <span style={{color: "black"}}>Please check your email for your Verification Code.</span>
                <hr/>
                <input className="verif-input" type="text" id="loginName" placeholder="Username"   ref={(c) => loginName = c} />
                <input className="verif-input" type="test" id="verifCode" placeholder="Verification"   ref={(c) => verifCode = c} />
                <div className="verifButton">
                    <input type="submit" className="buttons" value="Verify" onClick={doVerification} />       
                </div>
            </form>
        </div>
    );
};

export default Verify;