import React, { useState } from 'react';


function HomePageGroups() {

    var _ret;
    var error;

    const grabGroups = async event => {     
        
        event.preventDefault();        
        var obj = {Results:_ret, Error:error};        
        var js = JSON.stringify(obj);        
        
        try {                
            const response = await fetch('http://localhost:5000/api/readGroup', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});        
            var res = JSON.parse(await response.text());
        } catch(e) {            
            alert(e.toString());            
            return;        
        }        
    }; 


    return (    
        <div className="groups-div">
            <ul className="group-list">
                <li className="homepage-groups">Hello</li>
                <li className="homepage-groups">Hello</li>
                <li className="homepage-groups">Hello</li>
                <li className="homepage-groups">Hello</li>
                <li className="homepage-groups">Hello</li>
            </ul> 
        </div>
    );
};

export default HomePageGroups;