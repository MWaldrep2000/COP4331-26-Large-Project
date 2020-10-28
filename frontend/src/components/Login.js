import React, { useState } from 'react';

function Login()
{
    //Creates the variables for the inputs
    var loginName;
    var loginPassword;
  
    const [message,setMessage] = useState('');

    //When we try to login
    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        alert (js);
        try
        {   
            //- fetch() is what starts the request. Requires a resource (the URL)
            //  as well as options which are the method: 'POST' etc. stuff

            //- Since doLogin is asynchronous, the await keyword pauses the function
            //  until the request is complete

            //- Note that it says body:js. js is the json object that has the login and
            //  password so from there we are sending the login and password to the API
            const response = await fetch('http://localhost:5000/api/login',
              {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            //now that we have the result of what was sent back from the api,
            //we now parse it
            var res = JSON.parse(await response.text());
       
            if( res.flag <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                //create a user variable and stores that variable
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                //no error so empty string
                //*******dont know what '/cards' take you*****
                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };


    return(
      <div id="loginDiv">
        <form onSubmit={doLogin}>
        <span id="inner-title">PLEASE LOG IN</span><br />
        <input type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
        <input type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
        <input type="submit" id="loginButton" class="buttons" value = "Do It"
          onClick={doLogin} />
        </form>
        <span id="loginResult">{message}</span>
     </div>
    );
};

export default Login;