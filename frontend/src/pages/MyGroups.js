import React from 'react';
import NavBar from '../components/NavBar';
import JoinedGroups from '../components/JoinedGroups';
import SideBarIssues from '../components/SideBarIssues'

const MyGroups = () => {
    return (
        <div className="fullscreen">
            <NavBar/>
            <div>
                <JoinedGroups />
            </div>
        </div>
    );
}

export default MyGroups;