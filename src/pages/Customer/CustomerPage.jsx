import React, {useState, useEffect} from 'react';
import axios from 'axios'
import UserNav from '../../components/UserNav/UserNav';
import './Customer.css'

export default function Customer(){
    const [customerInfo, setCustomerInfo] = useState([]);
    const [trackInfo, setTrackInfo] = useState([]);
    const [showPass, setShowPass] = useState(false);

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
                const responseC = await axios.request(option);
                const data = responseC.data;
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
                const responseT = await axios.request(option);
                // var result = responseT.data;
                const tracks = responseT.data.map((track) => {
                    const standardDate = new Date(track.est_delivery_date).toLocaleDateString('en-US');
                    return {...track, est_delivery_date: standardDate};
                  });
                setTrackInfo(tracks);
                console.log(responseT.data);
            } catch (error) {
                console.log(error);
            }
        }
        getTracks();
    }, [current_user]); 

    const completed = trackInfo.filter((item) => item.tracking_status === 4);
    const inProgress = trackInfo.filter((item) => item.tracking_status < 4);

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
                        <br/>Password: <button className="button-pass" onClick={() => setShowPass(prevState => !prevState)}>
                        {showPass ? 'Hide Password' : 'Show Password'}
                        </button>
                        {showPass && <p className="container-pass">{customerInfo.password}</p>}
                    </div>
                </li>


                <li className="customer-shipments">
                    <div>
                        {/* <br/><button onClick={handleClick}>Shipment History</button> */}
                        <br/>Shipments in Progress<table className='container-table'>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Shipment Status</th>
                                <th>Tracking Status</th>
                                <th>Number of Packages</th>
                                <th>Estimated Delivery Date</th>
                            </tr>
                        {trackInfo && (
                            inProgress.map((item) => (
                                <tr>
                                    <td>{item.shipment_tracking_id}</td>
                                    <td>{item.shipment_status}</td>
                                    <td>{item.tracking_status}</td>
                                    <td>{item.num_packages}</td>
                                    <td>{item.est_delivery_date}</td>
                                </tr>
                            )
                        ))}
                        </table>
                        <br/>Completed Shipments<table className='container-table'>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Shipment Status</th>
                                <th>Tracking Status</th>
                                <th>Number of Packages</th>
                                <th>Estimated Delivery Date</th>
                            </tr>
                        {trackInfo && (
                            completed.map((item) => (
                                <tr>
                                    <td>{item.shipment_tracking_id}</td>
                                    <td>{item.shipment_status}</td>
                                    <td>{item.tracking_status}</td>
                                    <td>{item.num_packages}</td>
                                    <td>{item.est_delivery_date}</td>
                                </tr>
                            )
                        ))}
                        </table>
                    </div>
                </li>
            </div>
        </div>
        </>
    );
}