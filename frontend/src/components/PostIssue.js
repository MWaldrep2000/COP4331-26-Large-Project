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

    createIssue = (event) => {
        event.preventDefault();
        alert("You are submitting " + this.state.topic + " and " + this.state.description);
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

{/* <div>
            <form>
                <input className="form-input" type="text" id="loginName" placeholder="Enter Group Name"   ref={(c) => groupName = c} />
                <div className="loginButton">
                    <input type="submit" className="buttons" value="Create Group" onClick={createGroup} />       
                </div>
            </form>
        </div> */}