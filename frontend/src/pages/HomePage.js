import React from 'react';
import PageTitle from '../components/PageTitle';
import NavBar from '../components/NavBar';
import UserProfile from '../components/UserProfile';
import HomePageGroup from '../components/HomePageGroup';


const HomePage = () => {
    return (
        <div>
            <NavBar/>
            <UserProfile />
            <HomePageGroup />
        </div>
    );
}

export default HomePage;
