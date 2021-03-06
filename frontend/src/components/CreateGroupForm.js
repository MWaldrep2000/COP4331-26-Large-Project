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
        // alert("inside func");
        // alert(js);
        try {             
            // alert("inside try block");   
            const response = await fetch(buildPath('api/createGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});
            // alert("response received");        
            var res = JSON.parse(await response.text());
            // alert("finished call");
            //alert(res);
            if (res.Error === "Group already Exists") {
                setMessage("Group already exists."); 
            } else {                
                setMessage('');
                window.location.href = '/home';  
            }
                
        } catch(e) {            
            alert(e.toString());            
            return;        
        }
    };

    return (
        <>
        <div className="searchWrapper">
            <form>
                <input className="search-input" type="text" id="loginName" placeholder="Enter Group Name"   ref={(c) => groupName = c} />
                <div>
                    <input type="submit" className="searchButton" value="Create Group" onClick={createGroup} />       
                </div>
            </form>
        </div>
        <span id="searchResult" className="search-error">{message}</span>
        </>
    );

};

export default CreateGroupForm;