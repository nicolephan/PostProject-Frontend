import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';

Modal.setAppElement('#root');

const ReadCustomerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null); //for ALL button
  const [emailresult, setEmailResult] = useState(null);
  const [email, setEmail] = useState('');
  const [customerType, setCustomerType] = useState('');

  const handleSubmit = async (event) => {
  event.preventDefault();
  //Handle the response data
  
  //Override anything put in the email form if radio is ticked
  if (customerType === 'all')
  {
      console.log(customerType);

      const options = {
          method: 'GET',
          url: 'https://postoffice-api.herokuapp.com/api/customers',
          headers: {'Content-Type': 'application/json'},
      };

      try { 
          const response = await axios.request(options);
          console.log(response.data);
          setResult(response.data);
      } catch (error) {
          console.error(error);
          setResult(`error`);
      }
  }
  //Handles individual query of email input
  else 
  {
      console.log(email)
      const options = {
          method: 'POST',
          url: 'https://postoffice-api.herokuapp.com/api/userinfo',
          headers: {'Content-Type': 'application/json'},
          data : {
              email,
          }
      };
      try {
          
          
          const response = await axios.request(options);
          console.log(response.data);
          setEmailResult(response.data);
          
      } catch (error) {
          console.error(error);
          setResult(`error`);
          alert(result);
      }
    
  }

  

  console.log(`Submitted`);
  setIsOpen(true);
};

const handleCloseModal = () => {
  setIsOpen(false);
  setResult(null);
  setEmailResult(null);
  setEmail(null);
};

useEffect(() => {
  if (!isOpen) {
    setCustomerType('');
    setEmail('');
  }
}, [isOpen]);

const validateForm = () => {
  return email !== '' || customerType !== '';
}
  


  return (
    <>
      <button onClick={() => setIsOpen(true)}>Read Customers</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Simple Form Modal"
        className="modal"
        overlayClassName="overlay"
      >
        <button className="close-btn" onClick={handleCloseModal}>
          <span className="close-icon">&times;</span>
        </button>

        <h2>Read Customers</h2>

        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div>
            <input type="radio" name="customer-type" value="all" checked={customerType === 'all'} onChange={(e) => setCustomerType(e.target.value)} />
            <label htmlFor="all">All Customers</label>
          </div>

            <button type="submit" disabled={!validateForm()}>Submit</button>
        </form>

        {/*Conditional Rendering*/}
        {
          emailresult && (
        <>
          <h4>User Info <br/>Email: {email}</h4>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Home Address</th>
                <th>Username/Email</th>
                <th>Password</th>
                <th>Is Active</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through response json data 
              and render to front end*/}

              <tr>
                <th>{emailresult.first_name}</th>
                <th>{emailresult.last_name}</th>
                <th>{emailresult.home_address}</th>
                <th>{emailresult.username}</th>
                <th>{emailresult.password}</th>
                <th>{String(emailresult.is_active)}</th>
              </tr>


            </tbody>
          </table>
        </>
          )}

        {
          result && (
        <>
          <h4>All Shipment</h4>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Home Address</th>
                <th>Username/Email</th>
                <th>Is Active</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through info json data 
              and render to front end*/}
              {result?.map((result) => {
                return (
                  <tr>
                    <th>{result.first_name}</th>
                    <th>{result.last_name}</th>
                    <th>{result.home_address}</th>
                    <th>{result.email}</th>
                    <th>{String(result.is_active)}</th>
                  </tr>
                );
              })}
              
            </tbody>
          </table>
        </>
        )
        }

        
  
      </Modal>
    </>
  )
}

export default ReadCustomerModal;