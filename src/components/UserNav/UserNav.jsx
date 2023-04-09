import React from 'react';
import './usernav.css';

import {Link} from "react-router-dom";

export default function UserNav(){

    //Logout function
    const handleLogout = () => {
        localStorage.clear();
        alert("You have been logged out.")
      };

    return(
        <div className="page-container">
            <nav className="nav">
                <Link to="/" className="home-title">QuickShip</Link>
                <ul>
                    <Link to="/login" onClick={handleLogout}>Logout</Link>
                </ul>
            </nav>
        </div>
    );
}

