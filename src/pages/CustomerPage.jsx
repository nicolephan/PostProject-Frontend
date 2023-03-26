import React from 'react';
import {Link} from 'react-router-dom';

export default function Customer(){
    return (
        <div>
            <h2>CUSTOMER</h2>
            <p>Contains <br/>
                <li>
                customer information
                </li>
                <li>
                information about current and past shipments
                </li>
                <br/>has link or button that takes customer 
                <br/>to current shipments tracking history
            </p>
            <Link to='/track'>Track Package</Link>
        </div>
    );
}