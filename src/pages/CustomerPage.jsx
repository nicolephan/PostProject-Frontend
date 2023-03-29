import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default function Customer(){
    const [firstName, setFirstName] = useState('');

    const handleFormSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        const options = {
            method: 'GET',
            // url: 'https://postoffice-api.herokuapp.com/api/users',
            url: '/api/users', // Use the /api prefix FOR DEV
            headers: {'Content-Type': 'application/json'}
          };
          
          try {
            const response = await axios.request(options);
            //data for first name??
            setFirstName(response.data);
            console.log(response.data);
          } catch (error) {
            console.error(error);
          }
      };

    return (
        <div className="container-customer">
            <h2>Hello {firstName}</h2>
            <ul>
                <li className="customerInfo">
                Email: <br/>
                Address: <br/>
                </li>
                <li>
                information about current and past shipments
                </li>
                <br/>has link or button that takes customer 
                <br/>to current shipments tracking history
            </ul>
            <Link to='/track'>Track Package</Link>
        </div>
    );
}