import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import UserNav from '../../components/UserNav/UserNav';
import './Customer.css'

export default function Customer(){
    const [customerInfo, setCustomerInfo] = useState('');
    const [tracks, setTracks] = useState('');

    const current_user = localStorage.getItem('email');
    //TODO: use current_user (email) to query into database

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
        <>
        {/* TODO: Display customer navbar here: home, logout(upon logout, delete localstorage vars)*/}
        <UserNav />
        <div className="container-customer">
            <h2 className="header-customer">Hello {current_user}</h2>
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
        </>
    );
}