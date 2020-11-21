import React, { useState, Component } from 'react';

class PostIssue extends Component {

    constructor(props) {
        super(props);
        this.state = {topic: '', description: ''};
    }

    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
    }

    createIssue = async (event) => {
        event.preventDefault();

        var _ud = localStorage.getItem('user_data');
        var ud = JSON.parse(_ud);
        var uid = ud.ID;
        var uname = ud.Username;

        //const {userID, memberID, groupID, topic, description, username} = req.body;
        var obj = {userID:uid, memberID:1, groupID: this.props.pid,topic:this.state.topic, description:this.state.description, username: uname };        
        var js = JSON.stringify(obj);

        try {                
            const response = await fetch('http://localhost:5000/api/createIssue', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});           
            var res = JSON.parse(await response.text());
            if( res.Error !== "" ) {                         
                alert(res.Error);           
            }        
        } catch(e) {            
            alert(e.toString());            
            return;        
        }      

        this.props.close();
    }
    
    render() {  
        return (  
            <div className="dark">
                <div className="post-issue">
                    <form>
                        <div className="post-header">
                            <span style={{position: "absolute", float:"left"}}>Group: {this.props.gname}</span>
                            <button className="x-button" onClick={this.props.close}><strong>X</strong></button>
                        </div>
                        <br />
                        Topic:
                        <br />
                        <input className="topic-input" type="text" id="issueTopic" name="topic" onChange={this.myChangeHandler}  />
                        <br />
                        Description:
                        <br />
                        <textarea className="desc-input" type="text" id="issueDesc" name="description" onChange={this.myChangeHandler}  />
                        <br />
                        <input type="submit" className="issue-submit" value="Submit" onClick={this.createIssue} />
                    </form>
                </div>
            </div> 
        );  
    }  
} 

export default PostIssue;

// const doLogin = async event => {     
        
        
//     event.preventDefault();        
//     var obj = {login:loginName.value,password:loginPassword.value};        
//     var js = JSON.stringify(obj);        
    
//     try {                
//         const response = await fetch('http://localhost:5000/api/login', {method:'POST',body:js,headers:{'Content-Type': 'application/json'}}); 
//         alert("login success");           
//         var res = JSON.parse(await response.text());
//         if( res.Flag <= 0 ) {                
//             setMessage('User/Password combination incorrect');            
//         } else {      
//             // Temporary user display          
//             var user = {Email:res.Email,ID:res.ID, Username:loginName.value};           
//             localStorage.setItem('user_data', JSON.stringify(user));                
//             setMessage('');               
//             window.location.href = '/home';            
//         }        
//     } catch(e) {            
//         alert(e.toString());            
//         return;        
//     }        
// }; 