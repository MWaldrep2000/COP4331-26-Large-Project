import React from 'react';
import PageTitle from '../components/PageTitle';
import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';
import HomePageGroups from '../components/HomePageGroups';

const HomePage = () => {
    return (
        <div className="fullscreen">
            <NavBar/>
            <UserProfile />
            <HomePageGroups />
        </div>
    );
}

export default HomePage;
