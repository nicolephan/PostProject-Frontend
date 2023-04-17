import React from 'react';
import './usernav.css';

import {Link} from "react-router-dom";

export default function UserNav(){

    //Logout function
    const handleLogout = () => {
        localStorage.clear();
        alert("You have been logged out.")
      };

    //Get role from local storage
    const userRole = localStorage.getItem("role");

    let profileLink = null;

    if (userRole === 'customer') {
        profileLink = <Link to="/customer">Profile</Link>;
    } else if (userRole === 'admin') {
        profileLink = <Link to="/admin">Profile</Link>;
    } else if (userRole === 'employee') {
        profileLink = <Link to="/employee">Profile</Link>;
    }

    return(
        <div className="page-container">
            <nav className="nav">
                <Link to="/" className="home-title">QuickShip [{userRole}]</Link>
                <ul>
                    {profileLink}
                    <Link to="/login" onClick={handleLogout}>Logout</Link>
                </ul>
            </nav>
        </div>
    );
}

