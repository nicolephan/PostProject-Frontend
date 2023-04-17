import React, {useState, useEffect} from 'react';
import axios from 'axios'
import UserNav from '../../components/UserNav/UserNav';
import UserInfo from '../../components/Fetch/UserInfo';

import TrashCanSvg from '../../components/SVGs/TrashCan';

import './Customer.css'

export default function Customer(){
    const [trackInfo, setTrackInfo] = useState([]);
    const [poBox, setPoBox] = useState([]);
    const [showPass, setShowPass] = useState(false);

    const current_user = localStorage.getItem('email');
    const customerInfo = UserInfo(current_user)
    //TODO: use current_user (email) to query into database

    const handleDeleteRow = () => {
        console.log('Button Pressed');
    }

    useEffect(() => {
        const optionShip = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            // url: '/api/user-shipments',
            url: 'https://postoffice-api.herokuapp.com/api/user-shipments',
            data: {'email': current_user}
        };
        const optionPB = {
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            // url: '/api/po-boxes',
            url: 'https://postoffice-api.herokuapp.com/api/userbox',
            data: {'email': current_user}
        };
        const getCustomerInfo = async () => {
            try{
                const responseT = await axios.request(optionShip);
                const tracks = responseT.data.map((track) => {
                    const standardDate = new Date(track.est_delivery_date).toLocaleDateString('en-US');
                    return {...track, est_delivery_date: standardDate};
                });
                setTrackInfo(tracks);
                console.log(responseT.data);

                const responseP = await axios.request(optionPB);
                const result = responseP.data;
                setPoBox(result);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        getCustomerInfo();
    }, [current_user]); 

    const completed = trackInfo
        .filter((item) => item.shipment_status === 'Delivered')
        .filter((item) => !item.mark_deletion);
    const inProgress = trackInfo
        .filter((item) => item.shipment_status !== 'Delivered')
        .filter((item) => !item.mark_deletion);;

    const totalPackages = inProgress.reduce((total, item) => {
        return total + item.num_packages;
      }, 0);
    
    return (
        <>
        {/* TODO: Display customer navbar here: home, logout(upon logout, delete localstorage vars)*/}
        <UserNav />

        <div className="container-customer">
            {customerInfo && (
                <h2 className="header-customer">Hello {customerInfo.first_name} {customerInfo.last_name},</h2>
            )}
            <li className="customerInfo">
                <div className="container-title">User Info <br/></div>
                <div className="container-customer-info">
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
                <br/>
                <p className="info-titles">Shipments in Progress</p>
                {inProgress.length > 0 ? (
                    <div>
                        <table className='container-table'>
                                <tr>
                                    <th>Tracking ID</th>
                                    <th>Shipment Status</th>
                                    {/* <th>Tracking Status</th> */}
                                    <th>Number of Packages</th>
                                    <th>Estimated Delivery Date</th>
                                </tr>
                                {trackInfo && (
                                    inProgress.map((item) => (
                                        <tr>
                                            <td>{item.shipment_tracking_id}</td>
                                            <td>{item.shipment_status}</td>
                                            {/* <td>{item.tracking_status}</td> */}
                                            <td>{item.num_packages}</td>
                                            <td>{item.est_delivery_date}</td>
                                            <td>
                                                <span style={{ float: 'right' }}>
                                                    <TrashCanSvg onClick={() => handleDeleteRow(item)}  width='20px' height='20px' />
                                                </span>
                                            </td>
                                        </tr>   
                                    )
                                ))
                                }
                            </table>
                        <p className="package-total">Total Packages Out For Delivery: {totalPackages}</p>
                    </div>
                ) : (
                    <p>No Shipments Out for Delivery</p>
                )}
                <br/> <p className="info-titles">Completed Shipments</p>
                {completed.length > 0 ? (
                    <table className='container-table'>
                        <tr>
                            <th>Tracking ID</th>
                            <th>Shipment Status</th>
                            {/* <th>Tracking Status</th> */}
                            <th>Number of Packages</th>
                            <th>Estimated Delivery Date</th>
                        </tr>
                    {trackInfo && (
                        completed.map((item) => (
                            <tr>
                                <td>{item.shipment_tracking_id}</td>
                                <td>{item.shipment_status}</td>
                                {/* <td>{item.tracking_status}</td> */}
                                <td>{item.num_packages}</td>
                                <td>{item.est_delivery_date}</td>
                            </tr>
                        )
                    ))}
                    </table>
                ) : (
                    <p>No Completed Shipments</p>
                )}
            </li>

            <div className="container-poBox">
                <br/> <p className="info-titles">Registered Po-Boxes</p>
                {poBox.length > 0 ? (
                <ul>
                    {poBox.map(item => (
                        <>
                            <p>Box Number: {item.box_num}</p>
                            <p>Located on {item.branch_address}</p>
                            <br/>
                        </>
                    ))}
                </ul>
                ) : (
                    <p>No Registered Po-Boxes</p>
                )}
            </div>
        </div>
        </>
    );
}