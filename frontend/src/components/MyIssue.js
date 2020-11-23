import { Component } from "react";
import React  from 'react';
import MyIssueViewIssue from './MyIssueViewIssue';
class MyIssue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: [],
            showIssue: false,
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
        
        const handleClick = (id) => {

            console.log(id);    
            this.setState({
                showIssue: true,
            })
            
            // try {
            //     var obj = {groupID:id};        
            //     var js = JSON.stringify(obj); 
            //     const response = await fetch('http://localhost:5000/api/readIssue', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});    
            //     var res = JSON.parse(await response.text());
            //     if(res.Results.length === 0) {
            //         this.setState({
            //             issues: ["No Issues Yet."],
            //             groupNames: gname,
            //             groupID: id,
            //         })
            //     }
            //     else {
            //         this.setState({
            //             issues: res.Results,
            //             groupNames: gname,
            //             groupID: id,
            //         })
            //     }
            // } catch(e) {
            //     alert(e.toString());
            //     return
            // }
        }



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
                                    <button className="myissue-button" onClick={() => {

                                        handleClick(issue.GroupID)
                                        

                                    }}>View Issue</button>
                                </div>
                            ))}
                    </div>
                </div>
                {/* <MyIssueViewIssue state={this.state}/> */}
                {this.state.showIssue === true ? <MyIssueViewIssue /> : null}
            </div>
        );
    }
}

export default MyIssue;