import React, { useState } from 'react';

function CreateGroupForm (){

    var groupName;
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var id = ud.ID;
    var email = ud.Email;

    const [message, setMessage] = useState('');

    const createGroup = async event => {
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
        // sends groupName and user's id "id", to the API to create an account with user as an admin
        var obj = {userID:id,groupname:groupName.value};        
        var js = JSON.stringify(obj);        
        alert("inside func");
        alert(js);
        try {             
            alert("inside try block");   
            const response = await fetch(buildPath('api/createGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
            alert("response received");        
            var res = JSON.parse(await response.text());
            alert("finished call");
            alert(res);
            if (res.Error === "Group already Exists") {
                alert("error"); 
            } else {                
                alert("group created?");
                window.location.href = '/home';  
            }
                
        } catch(e) {            
            alert(e.toString());            
            return;        
        }
    };

    return (
        <div>
            <form>
                <input className="form-input" type="text" id="loginName" placeholder="Enter Group Name"   ref={(c) => groupName = c} />
                <div className="loginButton">
                    <input type="submit" className="buttons" value="Create Group" onClick={createGroup} />       
                </div>
            </form>
        </div>
    );

};

export default CreateGroupForm;