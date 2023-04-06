import React from 'react';
import './adminnav.css';

import {Link} from "react-router-dom";

export default function AdminNav(){

    //Logout function
    const handleLogout = () => {
        localStorage.clear();
        alert("You have been logged out.")
      };

      //TODO add a few more links to modify stuff as an admin
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

