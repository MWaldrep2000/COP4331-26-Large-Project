import React, { useState } from 'react';

function SearchGroup (){

    var searchFor;
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var id = ud.ID;
    var email = ud.Email;
    var searchResults;
    const [message, setMessage] = useState('');
    const [groupList,setGroupList] = useState('');


    const SearchGroup = async event => {  
        event.preventDefault();
        // sends groupName and user's id "id", to the API to create an account with user as an admin
        var obj = {search:searchFor.value};        
        var js = JSON.stringify(obj);
        try {
            const response = await fetch('http://localhost:5000/api/searchGroup', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});    
            var res = JSON.parse(await response.text());
            var searchRes = res.Results;
            if (searchRes.length === 0) {
                alert("no groups found"); 
            } else {   
                var resultText = '';             
                for (var i=0; i < searchRes.length; i++)
                {
                    //temporary result text for display purposes
                    resultText += searchRes[i].Name;
                    if( i < searchRes.length - 1 )
                    {
                        resultText += ', ';
                    }
                }
                setGroupList(resultText);
            }
                
        } catch(e) {            
            alert(e.toString());            
            return;        
        }
    };
                            // GOOD JOB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return (
        <div>
            <form>
                <input className="form-input" type="text" id="loginName" placeholder="Search Group" ref={(c) => searchFor = c } />
                <div className="loginButton">
                    <input type="submit" className="buttons" value="Search Groups" onClick={SearchGroup} />
                </div>
            </form>
            <p id="groupList">{groupList}</p><br /><br />     
        </div>
    );

};

export default SearchGroup;