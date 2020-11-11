import React from 'react';
import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import NavBar from '../components/NavBar';

const HomePage = () => {
    return (
        <div className="fullscreen">
            <NavBar/>
            <div>
                <PageTitle/>
                <LoggedInName/>
            </div>
        </div>
    );
}

export default HomePage;