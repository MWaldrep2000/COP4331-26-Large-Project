import React from 'react';
import NavBar from '../components/NavBar';
import SearchGroup from '../components/SearchGroup';

const SearchGroups = () => {
    return (
        <div className="fullscreen">
            <NavBar/>
            <div>
                <SearchGroup/>
            </div>
        </div>
    );
};

export default SearchGroups;