import React from 'react'

const MyIssueViewIssue = ({state, setState}) => {

    return (
        <div className="dark myissue-viewissue-bg" >
            <div className="myissue-viewissue-div">
                <div className="myissue-viewissue-closebutton" onClick={ () => {}}></div>
                <div className="myissue-viewissue-issuewrapper">
                    <div className="myissue-viewissue-"> {state.GroupID} </div>
                    <div className="myissue-viewissue-"> {state.Topic} </div>
                    <div className="myissue-viewissue-"> {state.description} </div>
                    <div className="myissue-viewissue-"> {state.Poster} </div>
                </div>
            </div>
        </div>
    );
};

export default MyIssueViewIssue;