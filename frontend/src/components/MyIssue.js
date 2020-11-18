import { Component } from "react";
import React  from 'react';

class MyIssue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: [],
            // MemberID: [],
            // GroupID: [], 
            // Topic: [],
            // Description: [],
            // Username: [], 
        }
    }    
    
    async componentWillMount() {

        var _un = localStorage.getItem('user_data');
        var un = JSON.parse(_un);
        var uname = un.Username;
        var obj = {username : uname};     
        var js = JSON.stringify(obj);  
        const response = await fetch('http://localhost:5000/api/readAllIssues', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        // var issueList = [];
        // issueList = res.Results;
        this.setState({
            id: res.Results,
        })

    }
    
    
    render() {
        
        return(
            <div>
                <div className="myissue-wrapper">
                    <div className="myissues-div">
                            {this.state.id.map((issue, index) => (
                                <div className="myissue-name">
                                    <div className="myissue-topic">
                                        {issue.Topic}
                                    </div>
                                    <div className="myissue-description">
                                        {issue.Description}
                                    </div>
                                    <button className="myissue-button">View Issue</button>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            // <div className="groups-div">
            //     {this.state.names.slice(0,6).map((group, index) => (
            //         <span className="group-names">
            //             {group.Name}
            //             <button id={group._id} className="hpg-group-button" onClick={() => handleClick(group._id)}>Join Group</button>
            //         </span>
                    
            //         ))}
            // </div>
        );
    }
}

export default MyIssue;