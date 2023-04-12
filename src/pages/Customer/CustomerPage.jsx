import React, {useState, useEffect} from 'react';
import axios from 'axios'
import UserNav from '../../components/UserNav/UserNav';
import './Customer.css'

export default function Customer(){
    const [customerInfo, setCustomerInfo] = useState([]);
    const [trackInfo, setTrackInfo] = useState([]);

    const current_user = localStorage.getItem('email');
    //TODO: use current_user (email) to query into database

    useEffect(() => {
        const option = {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    // url: '/api/userinfo',
                    url: 'https://postoffice-api.herokuapp.com/api/userinfo',
                    data: {'email': current_user}
                };
        const getCustomerInfo = async () => {
            try{
                const response = await axios.request(option);
                const data = response.data;
                setCustomerInfo(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getCustomerInfo();
    }, [current_user]); 

    useEffect(() => {
        const option = {
                    headers: {'Content-Type': 'application/json'},
                    method: 'POST',
                    // url: '/api/user-shipments',
                    url: 'https://postoffice-api.herokuapp.com/api/user-shipments',
                    data: {'email': current_user}
                };
        const getTracks = async () => {
            try{
                const response = await axios.request(option);
                const data = response.data;
                setTrackInfo(data);
                console.log(data);

            } catch (error) {
                console.log(error);
            }
        }
        getTracks();
    }, [current_user]); 

    return (
        <>
        {/* TODO: Display customer navbar here: home, logout(upon logout, delete localstorage vars)*/}
        <UserNav />
        <div className="container-customer">
            {customerInfo && (
                <h2 className="header-customer">Hello {customerInfo.first_name} {customerInfo.last_name},</h2>
            )}
            <div>
                <li className="customerInfo">
                    <div className="container-title">User Info <br/></div>
                    <div className="info-details">
                        <br/>Email: {current_user}<br/>
                        Address: {customerInfo.home_address}<br/>

                        <br/>User Type: {customerInfo.type}
                        <br/>Username: {customerInfo.username}
                        <br/>Password: {customerInfo.password}
                    </div>
                </li>

                <li className="customer-shipments">
                    <div>
                        {/* <br/><button onClick={handleClick}>Shipment History</button> */}
                        <br/><table className='container-table'>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Shipment Status</th>
                                <th>Tracking Status</th>
                                <th>Number of Packages</th>
                                <th>Estimated Delivery Date</th>
                            </tr>
                        {/* {trackInfo && (
                            trackInfo.map((item) => (
                                
                            ) */}
                        {/* ))} */}
                        </table>
                    </div>
                </li>
            </div>
        </div>
        </>
    );
}