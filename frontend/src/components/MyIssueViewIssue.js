import React from 'react';
import { Component } from 'react';
class MyIssueViewIssue extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showIssue: false,
            ReplyToSend: "",
        }
    }   

    handleClose () {
        this.props.setData({showIssue : false});
    }

    myChangeHandler = (event) => {
        this.setState({ReplyToSend: event.target.value});
        
    }

    handleReplyButton () {
        if(this.state.ReplyToSend.length === 0){
            console.log("Invalid text. Nothing to send. ")
            return;
        }
        this.handleReply();
        document.getElementById("reply").value = "";
        this.setState({ReplyToSend:""});
    }

    async handleReply () {
        console.log(this.state.ReplyToSend);
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

        var obj = {issueID:this.props.data.IssueID, reply:this.state.ReplyToSend, username: uname};        
        var js = JSON.stringify(obj);

        try {                
            const response = await fetch(buildPath('api/replyToIssue'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});           
            var res = JSON.parse(await response.text());
            if( res.Error !== "" ) {                         
                alert(res.Error);           
            }        
        } catch(e) {            
            alert(e.toString());            
            return;        
        }      
        this.props.handleRefresh(this.props.data.IssueID);
    }
        render (){

            return (
                <div>
                        <div className="dark myissue-viewissue-bg">
                                <div className="myissue-viewissue-div">
                                    <div className="myissue-viewissue-closebutton" onClick={ () => {this.handleClose()}}></div>
                                    <div className="myissue-viewissue-issuewrapper">
                                        <div className="myissue-viewissue-groupid"> {this.props.data.Topic} </div>
                                        <div className="myissue-viewissue-issueinformation">
                                            <div className="myissue-viewissue-poster"> Posted by: {this.props.data.Poster} </div>
                                            <div className="myissue-viewissue-description">Description: {this.props.data.Description} </div>
                                        </div>
                                        <div className="myissue-viewissue-issuereplies">
                                            {this.props.data.Replies.map((reply, index) => (
                                                
                                                <div key={index} className="myissue-viewissue-reply">
                                                    <div className="myissue-viewissue-author">{reply.Author}</div>
                                                    <div className="myissue-viewissue-response">{reply.Reply}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                <textarea className="reply-input" type="text" id="reply" name="replyBox" onChange={this.myChangeHandler}/>
                                <button className="reply-button" onClick={() => this.handleReplyButton()}>Reply</button>
                            </div>
                        </div>
                </div>
            );
        }

}

export default MyIssueViewIssue;