import React, { useState, Component } from 'react';

class ViewResponse extends Component {

    constructor(props) {
        super(props);
        this.state = {Replies : [], ReplyToSend : ''};
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
            try {
                var _ud = localStorage.getItem('user_data');
                var ud = JSON.parse(_ud);    
                var obj = {issueID:this.props.issue._id};        
                var js = JSON.stringify(obj); 
                const response = await fetch(buildPath('api/readReplies'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});    
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
    
    render() {  

        const handleClick = () => {
            if(this.state.ReplyToSend.length === 0){
                return; 
            }
            sendReply();
            document.getElementById("reply").value = "";
            this.setState({ReplyToSend:""});
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
    
            var obj = {issueID:this.props.issue._id, reply:this.state.ReplyToSend, username: uname};        

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
            findReplies(this.props.issue._id);      
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
                var _ud = localStorage.getItem('user_data');
                var ud = JSON.parse(_ud);
                var obj = {issueID:issueId};        
                var js = JSON.stringify(obj); 
                const response = await fetch(buildPath('api/readReplies'), {method:'POST',body:js,headers:{'Content-Type': 'application/json', 'authorization' : ud.AccessToken}});    
                var res = JSON.parse(await response.text());
                this.setState({
                    Replies: res.Results,
                })
          
            } catch(e) {
                alert(e.toString());
                return
            }
        }


        return (  
            <div className="dark myissue-viewissue-bg">
                <div className="myissue-viewissue-div">
                    <div className="myissue-viewissue-closebutton" onClick={ () => {this.props.close()}}></div>
                    <div className="myissue-viewissue-issuewrapper">
                        <div className="myissue-viewissue-groupid"> {this.props.issue.Topic} </div>
                        <div className="myissue-viewissue-issueinformation">
                            <div className="myissue-viewissue-poster"> Posted by: {this.props.issue.Username} </div>
                            {/* <div className="myissue-viewissue-topic"> Topic: {this.state.Topic} </div> */}
                            <div className="myissue-viewissue-description">Description: {this.props.issue.Description} </div>
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
                    <button className="reply-button" onClick={() => handleClick()}>Reply</button>
                </div>
            </div>
        );  
    }  
} 

export default ViewResponse;