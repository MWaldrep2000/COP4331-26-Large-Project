import React from 'react';
import NavBar from '../components/NavBar';
import SrchGrps from '../components/SrchGrps';

const SearchGroups = () => {
    return (
        <div className="fullscreen">
            <NavBar/>
            <div>
                <SrchGrps/>
            </div>
        </div>
    );
};

export default SearchGroups;