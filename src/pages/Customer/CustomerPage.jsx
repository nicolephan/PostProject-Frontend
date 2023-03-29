import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import './Customer.css'

export default function Customer(){
    const [customerInfo, setCustomerInfo] = useState('');
    const [tracks, setTracks] = useState('');

    const getCustomerInfo = () => {
        // url: "https://postoffice-api.herokuapp.com/api/users"
        axios.get("/api/users")
        .then((response) => {
            setCustomerInfo(response.data);
            console.log(response.data);
        })
    };
    const getTracks = () => {
         //url: "https://postoffice-api.herokuapp.com/api/tracks"
         axios.get("/api/tracks", {
            // "customer_email": 
        })
        .then((response) => {
            setTracks(response.data);
            console.log(response.data);
        })
    }

    useEffect(() => getCustomerInfo(), []);
    useEffect(() => getTracks(), []);

    return (
        <div className="container-customer">
            <h2 className="header-customer">Hello {customerInfo.first_name},</h2>
            <div>
                <li className="customerInfo">
                    <div className="container-title">User Info <br/></div>
                    <div className="info-details">
                        <br/>Email: {customerInfo.email}<br/>
                        Address: {customerInfo.address}<br/>
                    </div>
                </li>
                <li className="customer-shipments">
                    <br/>Current Shipments: ID#{tracks.shipment_tracking_id}
                </li>
                <br/>has link or button that takes customer 
                <br/>to current shipments tracking history
            </div>
            <Link to='/track'>Track Package</Link>
        </div>
    );
}