import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import UpdateCustomerSVG from '../../SVGs/CustomerModal/UpdateCust';

const UpdateCustomerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [new_value, setNewValue] = useState('');
  const [email, setCustomerEmail] = useState('');
  const [key, setAttribute] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (key === "") {
      alert("Please select a valid option for attribute to change.");
      return;
    }
    //Handle the response data
    // console.log(email);
    // console.log(key);
    // console.log(new_value);

    

    //HTTP PUT request to update status
    // api/update-customer : PUT
    const options = {
        method: 'PUT',
        url: 'https://postoffice-api.herokuapp.com/api/update-customer',
        headers: {'Content-Type': 'application/json'},
        data: { 
                email, key, new_value
              },
      };
  
      //Handle the response data
      try {
        const response = await axios.request(options);
  
        // const formattedDate = new Date(response.data.creation_date).toLocaleDateString('en-US');
        // shipment.creation_date = formattedDate;
  
        console.log(response.data);
        setResult(response.data);
        alert('Customer Updated')
      } catch (error) {
        console.error(error);
        setResult(`error`);
        alert(result);
      }
  
  
      console.log(`PUT Submitted`);
      setIsOpen(false);
    }
    
    const handleCloseModal = () => {
      setIsOpen(false);
      setCustomerEmail('');
      setAttribute('');
      setNewValue('');
    };


  return (
    <>
    
    <div className="SVG-button">
      <UpdateCustomerSVG onClick={() => setIsOpen(true)} width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Update Customer</p>
    </div>
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
    
    <h2>Update a Customer</h2>
    <form onSubmit={handleSubmit}>
    
    <label className="label">Customer Email:</label>
    <input
        required
        value={email}
        onChange={(event) => setCustomerEmail(event.target.value)}
    />

    <div className='container-new-data'>
      <div>
        <label className="label">New Data:</label>
        <input
        required
        value={new_value}
        onChange={(event) => setNewValue(event.target.value)}
        />
      </div>

      <div>
        <label className="label">Attributes:</label>
        <select value={key} onChange={(event) => setAttribute(event.target.value)}>
            <option value="">Select</option>
            <option value="home_address">Home Address</option>
            <option value="first_name">First Name</option>
            <option value="last_name">Last Name</option>
        </select>
      </div>

      
    </div>
    <button type="submit">Submit</button>
    </form>
    </Modal>
    </>
  )
}

export default UpdateCustomerModal;