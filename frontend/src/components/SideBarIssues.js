import React, { useState } from 'react';
import PostIssue from './PostIssue';
import ViewResponse from './ViewResponse';

const SideBarIssues = ({state}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [postID, setID] = useState(null);
    const [postName, setName] = useState(null);
    const [currIssue, setIssue] = useState(null);
    const [showIssue, setShowIssue] = useState(false);
    const [reload, setReload] = useState(false);
    const [message, setMessage] = useState('');

    const reloader = () => {
        setReload(!reload);
    }
    const closePost = () => {
        setID(null);
        setName(null);
        setIsOpen(false);
    }

    const openPost = (pid, gname) => {
        if( pid === 0 )
        {
            setMessage("Please select a group before posting.");
        }
        else
        {
            setMessage("");
            setID(pid);
            setName(gname);
            setIsOpen(!isOpen);
        }
    }

    const seeResponses = (issue) => {
        setIssue(issue);
        setShowIssue(!showIssue);
    }

    const closeResponse = () => {
        setIssue(null);
        setShowIssue(!showIssue);
    }

    return (
        <>
        <span id="searchResult" className="search-error">{message}</span>
        <div className="sidebar">
            <div className="table-header">
                <p className="group-title"><strong>{state.groupNames}</strong></p>
                <button className="post-button" id={state.groupID} onClick={() => openPost( state.groupID,state.groupNames)}><strong>Post</strong></button>
            </div>
            <div className="issues-div">
                {((typeof state.issues[0]) === "string") ? <p className="leftMarg">{state.issues[0]}</p> : 
                state.issues.map((iss, index) => (
                    <span className="myissue-names">
                        {iss.Topic}<br/>
                        Posted by: {iss.Username}
                        <button id={iss.GroupID} className="response-button" onClick={() => seeResponses( iss )}>See Responses</button>
                    </span>
                ))}
            </div>
        </div>
        {isOpen? <PostIssue state={state} isOpen={isOpen} gname={postName} pid={postID} close={closePost} /> : null}
        {showIssue? <ViewResponse showIssue={showIssue} issue={currIssue} setIssue={setIssue} refresh={true} close={closeResponse} jankReload={reloader}/> : null}
        </>
    );
};

export default SideBarIssues;

// {this.state.names.map((group, index) => (
//     <span className="mygroup-names">
//         {group.Name}
//         <button id={group._id} className="hpg-group-button" onClick={() => handleClick(group._id, group.Name)}>Open Issues</button>
//     </span>