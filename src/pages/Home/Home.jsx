//TODO (4/13/2023)
// pull creation date (curr_date), tracking status, est_delivery_date in data
// display tracking bar based on tracking status (1 2 3 or 4).

import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';
import UserNav from '../../components/UserNav/UserNav';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tracking_id, setTrackingID] = useState('');
  const [result, setResult] = useState(null);
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
        setResult(shipment);
        console.log(response.data);
      } catch (error) {
        console.error(error);
        setResult(`Shipment with tracking ID: ${tracking_id} not found!`);
      }
  };

  return (
    <>
    {isLoggedIn ? <UserNav/> : <Navbar /> }
    
    
    <div className="hTrackPackage">
      
      <h1>Track a Shipment</h1>

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

      <div>
        {result && (
          <div>
            Data:
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
    </>
  );
}

