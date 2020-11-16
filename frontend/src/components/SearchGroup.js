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
                // var resultText = '';             
                // for (var i=0; i < searchRes.length; i++)
                // {
                //     //temporary result text for display purposes
                //     resultText += searchRes[i].Name;
                //     if( i < searchRes.length - 1 )
                //     {
                //         resultText += ', ';
                //     }
                // }
                // setGroupList(resultText);
                createSearchTable(searchRes);
            }
                
        } catch(e) {            
            alert(e.toString());            
            return;        
        }
    };

    function joinGroup(gid) {
        alert("inside joinGroup " + gid);
    }

    function createSearchTable (res) {
        var sTable = document.getElementById("SearchResult");
        var tbody = document.createElement("tbody");

        while (sTable.firstChild) {
            sTable.removeChild(sTable.firstChild);
        }
        

        for (var i=0; i < res.length; i++)
        {
            // The following generates HTML, not JSX!
            // Hence the attribute "class" and not "className"
            var tr = document.createElement("tr");
            var groupID = res[i]._id;
            tr.setAttribute("id", groupID);
            tr.setAttribute("class", "searchRow");

            var td1 = document.createElement("td");
            td1.setAttribute("class", "groupName");
            console.log(td1);
            td1.textContent = res[i].Name;
            tr.appendChild(td1);

            var joinButton = document.createElement("button");
            joinButton.textContent = "Join";
            joinButton.setAttribute("class", "joinButton");
            joinButton.setAttribute("id", groupID);
            var gName = res[i].Name;
            joinButton.addEventListener('click', new function() {
                joinGroup(joinButton.getAttribute("id"));});
            console.log(joinButton);
            

            tr.appendChild(joinButton);
            //add the row to the tbody
            tbody.appendChild(tr);
            
            //now add tbody to the table
            sTable.appendChild(tbody);
        }

        console.log();
    }
    // GOOD JOB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return (
        <div>
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
                <table id="SearchResult" className="searchyTable"></table>
            </div>
        </div>
    );

};

export default SearchGroup;