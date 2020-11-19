import React, { useState } from 'react';

const SideBarIssues = ({state}) => {

    return (
        <div className="sidebar">
            <div className="table-header">
                <p className="group-title"><strong>{state.groupNames}</strong></p>
                <button className="post-button" id={state.GroupID}><strong>Post</strong></button>
            </div>
            <div className="issues-div">
                {((typeof state.issues[0]) === "string") ? <p className="leftMarg">{state.issues[0]}</p> : 
                state.issues.map((iss, index) => (
                    <span className="myissue-names">
                        {iss.Topic}
                        <button id={iss.GroupID} className="response-button">See Responses</button>
                    </span>
                ))}
            </div>
        </div> 
    );
};

export default SideBarIssues;

// {this.state.names.map((group, index) => (
//     <span className="mygroup-names">
//         {group.Name}
//         <button id={group._id} className="hpg-group-button" onClick={() => handleClick(group._id, group.Name)}>Open Issues</button>
//     </span>