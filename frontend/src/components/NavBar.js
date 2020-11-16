import React from "react";
import img from '../logoImages/logo_transparent.png'

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
            <div className="nav-logo-div">
                <img id="logo" className="nav-logo" src={img} onClick={goHome}></img>
                
            </div>
            <div className="navbuttons-div">
                 <li className="navbuttons" onClick={goToMyGroup}>MY GROUPS</li>
                 <li className="navbuttons" onClick={goSearch}>SEARCH GROUP</li>
                 <li className="navbuttons" onClick={goToCreateGroup}>CREATE GROUP</li>
                 <li className="navbuttons" onClick={goToMyIssues}>MY ISSUES</li>
             </div>
        </div>
        // <div className="navbar">
        //     <div className="logo-div">
        //         <img id="logo" className="navlogo" src={img} onClick={goHome}></img>
        //     </div>
        //     {/* <li id="logo" className="navbuttons" onClick={goHome}></li> */}
        //     <div className="navbuttons-div">
        //         <li id="navbarButton" lassName="navbuttons" onClick={goToMyGroup}>MY GROUPS</li>
        //         <li id="navbarButton" className="navbuttons" onClick={goSearch}>SEARCH GROUP</li>
        //         <li id="navbarButton" className="navbuttons" onClick={goToCreateGroup}>CREATE GROUP</li>
        //         <li id="navbarButton" className="navbuttons" onClick={goToMyIssues}>MY ISSUES</li>
        //     </div>
        // </div>
    );
}

export default NavBar;