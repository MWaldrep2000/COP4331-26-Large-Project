import React from "react";

const NavBar = () => {
    const goToCreateGroup = (e) => {
        window.location.href = '/createGroup'; 
    }

    const goHome = (e) => {
        window.location.href = '/home'; 
    }

    const goToMyIssues = (e) => {
        window.location.href = '/issues'; 
    }

    const goToMyGroup = (e) => {
        window.location.href = '/myGroups'; 
    }

    const goSearch = (e) => {
        window.location.href = '/search'; 
    }

    return (
        <div className="navbar">
            <div className="navlogo" onClick={goHome}></div>
            <div className="navbuttons" onClick={goToMyGroup}>MY GROUPS</div>
            <div className="navbuttons" onClick={goToMyIssues}>MY ISSUES</div>
            <div className="navbuttons" onClick={goSearch}>SEARCH GROUP</div>
            <div className="navbuttons" onClick={goToCreateGroup}>CREATE GROUP</div>
        </div>
    );
}

export default NavBar;