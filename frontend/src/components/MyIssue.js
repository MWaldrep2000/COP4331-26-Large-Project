import React, { Component, useState } from 'react';
import MyIssueViewIssue from './MyIssueViewIssue';

class MyIssue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: [],
            showIssue: false,
            GroupID: "",
            Topic: "",
            Description: "",
            Poster: "",
            Replies: [],
            ReplyToSend: '',
            IssueID: 0,
            refresh: true,
        }
        this.setState = this.setState.bind(this);
    }    
    
    async componentWillMount() {

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

        var _un = localStorage.getItem('user_data');
        var un = JSON.parse(_un);
        var uname = un.Username;
        var obj = {username : uname};     
        var js = JSON.stringify(obj);  
        const response = await fetch(buildPath('api/readAllIssues'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
        var res = JSON.parse(await response.text());
        // var issueList = [];
        // issueList = res.Results;
        this.setState({
            id: res.Results,
        })

    }

    render() {
        
        const handleClick = (groupinfo) => {
            findReplies(groupinfo._id);
            this.setState({
                showIssue: true,
                GroupID: groupinfo.GroupID,
                Topic: groupinfo.Topic,
                Description: groupinfo.Description,
                Poster: groupinfo.Username,
                IssueID: groupinfo._id,
            })
            console.log(this.state);   
        }
        
        const handleRefresh = (id) => {
            findReplies(id);
            console.log(this.state.Replies);
        }
        const findReplies = async (issueId) => {

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
            try {
                var obj = {issueID:issueId};        
                var js = JSON.stringify(obj); 
                const response = await fetch(buildPath('api/readReplies'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});    
                var res = JSON.parse(await response.text());
                this.setState({
                    Replies: res.Results,
                })
          
            } catch(e) {
                alert(e.toString());
                return
            }
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

                                        handleClick(issue)
                                        

                                    }}>View Issue</button>
                                </div>
                            ))}
                    </div>
                </div>
                {this.state.showIssue === true ? <MyIssueViewIssue handleRefresh={handleRefresh} data={this.state} setData={this.setState} /> : null}
            </div>
        );
    }
}

export default MyIssue;