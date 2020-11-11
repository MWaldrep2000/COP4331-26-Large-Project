import React from 'react';
import NavBar from '../components/NavBar';
import CreateGroupForm from '../components/CreateGroupForm';

const CreateGroup = () => {
    return (
        <div className="fullscreen">
            <NavBar/>
            <div>
                <CreateGroupForm/>
            </div>
        </div>
    );
}

export default CreateGroup;