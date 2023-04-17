//TODO (4/13/2023)
// pull creation date (curr_date), tracking status, est_delivery_date in data
// display tracking bar based on tracking status (1 2 3 or 4).

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import UserNav from '../../components/UserNav/UserNav';
import { PackageIcon } from '../../components/SVGs/Package';
import PackageFound from '../../components/SVGs/PackageFound';
import './Home.css';
import post_bg from '../../components/post_queue.png';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tracking_id, setTrackingID] = useState('');
  const [result, setResult] = useState(null);
  const [location, setLocation] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    // for (let key in localStorage) {
    //   if (localStorage.hasOwnProperty(key)) {
    //     const value = localStorage.getItem(key);
    //     console.log(`${key}: ${value}`);
    //   }
    // }
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      setIsLoggedIn(true);
    }
  }, []);

  //POST REQUEST FORM HANDLER
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const options = {
        method: 'POST',
        url: 'https://postoffice-api.herokuapp.com/api/shipment',
        // url: '/api/users', // Use the /api prefix FOR DEV
        headers: {'Content-Type': 'application/json'},
        data: { tracking_id },
      };
      
      //Handle the response data
      try {
        const response = await axios.request(options);
        var shipment = response.data;
        const formattedDate = new Date(response.data.creation_date).toLocaleDateString('en-US');
        shipment.creation_date = formattedDate;
        const formattedEstDelivery = new Date(shipment.est_delivery_date).toLocaleDateString('en-US');
        shipment.est_delivery_date = formattedEstDelivery;
        setResult(shipment);
        console.log(response.data);

        if(shipment.shipment_status === 'Delivered'){
          setLocation(shipment.home_address);
        } else {
          setLocation(shipment.current_location);
        }
      } catch (error) {
        console.error(error);
        setResult(`Shipment with tracking ID: ${tracking_id} not found!`);
      }
  };

  return (
    <>
    {isLoggedIn ? <UserNav/> : <Navbar /> }
  
    <div className="hTrackPackage">
      <div className="background-overlay" style={{opacity:0.5}}>
        <div className="background" style={{backgroundImage: `url(${post_bg})`}}></div>
      </div>
      
      <div className="track-bar">
        <PackageIcon/>
        <h1 className="trackTitle">Track a Shipment</h1>
        <form onSubmit={handleFormSubmit}>
          <div className='input-group'>
            <input 
              type="text" 
              ref={inputRef}
              onChange={(e) => setTrackingID(e.target.value)} 
              required
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    {result && location && !result.mark_deletion && (
      <div className="container-trackShipment">
        {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
        <h2 className="track-status">{result.shipment_status} <PackageFound className="package-found-icon" width='30' height='30'/></h2>
        <p className="data-info"> Current Location: {location}</p>
        
        <div className="track-progress">
          <div className={`progress-point ${result.shipment_status <= 'Labeling' ? 'active' : ''} ${result.shipment_status === 'Stopped' ? 'stopped' : ''}`}>
            <span className='progress-bar-text'>Ordered</span>
          </div>
          <div className={`progress-bar-line ${result.shipment_status <= 'In Transit' ? 'active' : ''} ${result.shipment_status === 'Stopped' ? 'stopped' : ''}`}></div>
          <div className={`progress-point ${result.shipment_status <= 'In Transit' ? 'active' : ''} ${result.shipment_status === 'Stopped' ? 'stopped' : ''}`}>
            <span className='progress-bar-text'>In Transit</span>
          </div>
          <div className={`progress-bar-line ${result.shipment_status <= 'Delivered' ? 'active' : ''} ${result.shipment_status === 'Stopped' ? 'stopped' : ''}`}></div>
          <div className={`progress-point ${result.shipment_status <= 'Delivered' ? 'active' : ''} ${result.shipment_status === 'Stopped' ? 'stopped' : ''}`}>
            <span className='progress-bar-text'>Delivered</span>
          </div>
        </div>
        <p>Expected Delivery Date: {result.est_delivery_date}</p>

        <p className="data-titling">Tracking ID#</p>
        <p className="data-info">{result.tracking_id}</p>
        <p className="data-titling">Number of Packages</p>
        <p className="data-info">{result.num_packages}</p>
      </div>
    )}
    </>
  );
}

