// import REACT, {useRef} from 'react';
// import "./Home.css";

// export default function Home(){
//     return(
//         <div className="hTrackPackage">
//             <h1>Track A Package</h1>
//             <SearchBar />
//         </div>
//     );
// }

import React, { useRef, useState } from 'react';
import axios from 'axios';
import Navbar from '../../components/Navbar/Navbar';
import './Home.css';

export default function Home() {
  const [tracking_id, setTrackingID] = useState('');
  const [result, setResult] = useState(null);
  const inputRef = useRef();

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
    <Navbar />
    
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

// function SearchBar(props){
//     const query = useRef();

//     const handleSearch =(e) => {
//         e.preventDefault();
//         const queryVal = query.current.value;
//         props.fetchID(queryVal.trim());
//     };

//     return(
//         <form action="/" method="get">
//             <label htmlFor="header-search"></label>
//             <input
//                 type="text"
//                 id="header-search"
//                 placeholder="Package #ID"
//                 name="s"
//             />
//             <button type="submit" onSubmit={handleSearch}>Enter</button>
//         </form>
//     );
// }
