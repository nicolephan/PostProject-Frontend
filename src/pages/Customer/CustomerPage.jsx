import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import './Customer.css'

export default function Customer(){
    const [data, setData] = useState('');
    // const [result, setResult] = useState('');

    // const getData = async (event) => {
    //     event.preventDefault(); // Prevent default form submission behavior
    //     const options = {
    //         method: 'GET',
    //         // url: 'https://postoffice-api.herokuapp.com/api/users',
    //         url: '/api/users', // Use the /api prefix FOR DEV
    //         headers: {'Content-Type': 'application/json'}
    //       };
          
    //       try {
    //         const response = await axios.request(options);
    //         setFirstName(response.data.first_name);
    //         console.log(response.data);
    //       } catch (error) {
    //         console.error(error);
    //       }
    //   };

    useEffect(() => {
        // url: "https://postoffice-api.herokuapp.com/api/users"
        axios.get("/api/users")
        .then((response) => {
            setData(response.data);
            console.log(response.data);
        })
    }, []);

    return (
        <div className="container-customer">
            <h2 className="header-customer">Hello {data.first_name},</h2>
            {/* <div> */}
            <li className="customerInfo">
                <div className="container-title">User Info <br/></div>
                <div className="info-details">
                    <br/>Email: {data.email}<br/>
                    Address: {data.address}<br/>
                </div>
            </li>
            <li className="customer-shipments">
                <br/>information about current and past shipments
            </li>
            <br/>has link or button that takes customer 
            <br/>to current shipments tracking history
            {/* </div> */}
            <Link to='/track'>Track Package</Link>
        </div>
    );
}