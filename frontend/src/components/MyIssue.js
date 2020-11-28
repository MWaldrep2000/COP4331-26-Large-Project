import { Component } from "react";
import React  from 'react';
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
    }    
    
    myChangeHandler = (event) => {
        this.setState({ReplyToSend: event.target.value});
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

        const handleRClick = () => {
            sendReply();
            this.setState({refresh: !this.state.refresh});
        }

        const sendReply = async () => {
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
    
            //event.preventDefault();
    
            var _ud = localStorage.getItem('user_data');
            var ud = JSON.parse(_ud);
            var uid = ud.ID;
            var uname = ud.Username;
    
            var obj = {issueID:this.state.IssueID, reply:this.state.ReplyToSend, username: uname};        
            var js = JSON.stringify(obj);
    
            try {                
                const response = await fetch(buildPath('api/replyToIssue'), {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});           
                var res = JSON.parse(await response.text());
                if( res.Error !== "" ) {                         
                    alert(res.Error);           
                }        
            } catch(e) {            
                alert(e.toString());            
                return;        
            }      
        }
        
        const handleClick = (groupinfo) => {

           findReplies(groupinfo._id);
            if(groupinfo === 0) {
                this.setState({
                    showIssue: !this.state.showIssue,
                })
            } else  
            this.setState({
                showIssue: !this.state.showIssue,
                GroupID: groupinfo.GroupID,
                Topic: groupinfo.Topic,
                Description: groupinfo.Description,
                Poster: groupinfo.Username,
                IssueID: groupinfo._id,
            })
            console.log(this.state);   
            
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

            console.log(res.Results);
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
                {this.state.showIssue === true ?
                
                    <div className="dark myissue-viewissue-bg" >
                        <div className="myissue-viewissue-div">
                            <div className="myissue-viewissue-closebutton" onClick={ () => {handleClick(0)}}></div>
                            <div className="myissue-viewissue-issuewrapper">
                                <div className="myissue-viewissue-groupid"> {this.state.Topic} </div>
                                <div className="myissue-viewissue-issueinformation">
                                    <div className="myissue-viewissue-poster"> Posted by: {this.state.Poster} </div>
                                    {/* <div className="myissue-viewissue-topic"> Topic: {this.state.Topic} </div> */}
                                    <div className="myissue-viewissue-description">Description: {this.state.Description} </div>
                                </div>
                                <div className="myissue-viewissue-issuereplies">
                                    {this.state.Replies.map((reply, index) => (
                                        
                                        <div className="myissue-viewissue-reply">
                                            <div className="myissue-viewissue-author">{reply.Author}</div>
                                            <div className="myissue-viewissue-response">{reply.Reply}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <textarea className="reply-input" type="text" id="reply" name="replyBox" onChange={this.myChangeHandler}  />
                            <button className="reply-button" onClick={() => handleRClick()}>Reply</button>
                        </div>
                    </div>
                
                
                    : null}


            </div>
        );
    }
}

export default MyIssue;