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
import './Home.css';

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [result, setResult] = useState(null);
  const inputRef = useRef();

  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    const options = {
        method: 'GET',
        url: '/api/users', // Use the /api prefix
        headers: {'Content-Type': 'application/json'}
      };
      
      try {
        const response = await axios.request(options);
        setResult(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
  };

  return (
    <div className="hTrackPackage">
      <h1>Track A Package</h1>

      <form onSubmit={handleFormSubmit}>
        <div className='input-group'>
          <input type="text" ref={inputRef} />
          <button type="submit">Submit</button>
        </div>
      </form>

      <div>
        {result && (
          <div>
            API response:
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
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
