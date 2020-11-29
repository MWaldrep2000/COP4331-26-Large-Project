import React, { useState } from 'react';

function SrchGrps (){

    var searchFor;
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var id = ud.ID;
    var gid;
    var searchResults = [];
    const [state, setState] = useState(searchResults);
    const [message, setMessage] = useState('');


    const SearchGroup = async event => {  
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
        searchResults= [];
        // sends groupName and user's id "id", to the API to create an account with user as an admin
        var obj = {search:searchFor.value};
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/searchGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});    
            var res = JSON.parse(await response.text());
            var searchRes = res.Results;
            if (searchRes.length === 0) {
                setMessage("No groups found."); 
            } else {   
                searchResults = searchRes;
                setMessage("");
            }
            setState(searchResults);
                
        } catch(e) {            
            alert(e.toString());            
            return;        
        }
    };

    const joinGroup = async event => {

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
        
        // event.preventDefault();
        searchResults = [];
        var obj = {userID:id,groupID:gid};
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(buildPath('api/joinGroup'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});    
            var res = JSON.parse(await response.text());

            if (res.Error === "User is already in this group")
            {
                document.getElementById(gid).style = "background-color: grey";
            }
        } catch(e) {
            alert(e.toString());
            return
        }
    }

    function callbackJoin(temp) {
        gid = temp;
        joinGroup();
    }

    return (
        <div state={state}>
            <div className="searchWrapper">
                 <form>
                     <input type="text" className="search-input" id="searching" placeholder="Search Group" ref={(c) => searchFor = c } />
                    <div>
                        <input type="submit" className="searchButton" value="Search Groups" onClick={SearchGroup} />
                    </div>
                </form>
                <br /><br />
            </div> 
            {/* <p id="groupList">{groupList}</p><br /><br /> */}
            <div className="fullSearch">
            <span id="searchResult" className="search-error">{message}</span>
                <table id="SearchResult" className="searchyTable">
                    <tbody>
                        {state.map((group) => (
                        <tr className="searchRow">
                            <td className="groupName">
                                {group.Name}
                            </td>
                            <button id={group._id} className="searchButton" onClick={() => callbackJoin(group._id)} >Join Group</button>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default SrchGrps;

   //         var joinButton = document.createElement("button");
    //         joinButton.textContent = "Join";
    //         joinButton.setAttribute("class", "joinButton");
    //         joinButton.setAttribute("id", groupID);
    //         var gName = res[i].Name;
    //         joinButton.addEventListener('click', new function() {
    //             joinGroup(joinButton.getAttribute("id"));});
    //         console.log(joinButton);