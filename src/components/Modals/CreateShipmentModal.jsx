import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './shippingModal.css';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const ShippingModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);

  //Generates random tracking ID of (3 digits)
  const tracking_id = Math.floor(Math.random()*(999-100+1)+100);
  const [current_location, setCurrentLoc] = useState('');
  const shipment_status = "Labeling";
  const [num_packages, setNumPackages] = useState('');
  const region = "South";
  const [customer_email, setCustomerEmail] = useState('');
  const [employee_email, setEmpEmail] = useState('');
  var todayDate = new Date(); todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset()); 
  var creation_date = todayDate.toISOString().slice(0,10);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //TODO handle on submit logic here
    // console.log(tracking_id);
    // console.log(today);
    // console.log(current_location);
    // console.log(shipment_status);
    // console.log(num_packages);
    // console.log(region);
    // console.log(customer_email);
    // console.log(employee_email);
    const options = {
      method: 'POST',
      url: 'https://postoffice-api.herokuapp.com/api/create-shipment',
      // url: '/api/create-shipment', // Use the /api prefix FOR local DEV API
      headers: {'Content-Type': 'application/json'},
      data: { tracking_id,
              creation_date,
              current_location,
              shipment_status,
              num_packages,
              region,
              customer_email,
              employee_email,
            },
    };

    //Handle the response data
    try {
      const response = await axios.request(options);

      // const formattedDate = new Date(response.data.creation_date).toLocaleDateString('en-US');
      // shipment.creation_date = formattedDate;

      console.log(response.data);
      setResult(response.data);
      alert('Shipment Created')
    } catch (error) {
      console.error(error);
      setResult(`error`);
      alert(result);
    }


    console.log(`Submitted`);
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Create Shipment</button>
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

        <h2>Create a Shipment</h2>
        <form onSubmit={handleSubmit}>
          <label className="label">Employee Email:</label>
          <input
            required
            id="eEmail"
            type="email"
            value={employee_email}
            onChange={(event) => setEmpEmail(event.target.value)}
          />

          <label className="label">Customer Email:</label>
          <input
            required
            id="cEmail"
            type="email"
            value={customer_email}
            onChange={(event) => setCustomerEmail(event.target.value)}
          />

          <label className="label">Number of Packages:</label>
          <input
            required
            id="numPackages"
            min = "0"
            step = "1"
            style={{ 
              width: "90px",
              textAlign: "left",
              paddingRight: "10px",
              boxSizing: "content-box",
            }}
            type="number"
            value={num_packages}
            onChange={(event) => setNumPackages(event.target.value < 0 ? 0 : event.target.value)}
          />

          {/* optional TODO: change location list to branches in database */}
          <label className="label">Current Location:</label>
          <select required className="location-select" name="cars" id="cars" value={current_location} onChange={(event) => setCurrentLoc(event.target.value)}>
            <option value=""></option>
            <option value="Houston">Houston</option>
            <option value="San Antonio">San Antonio</option>
            <option value="Dallas">Dallas</option>
            <option value="Austin">Austin</option>
          </select>

          <button type="submit">Submit</button>
        </form>
      </Modal>
    </>
  );
};

export default ShippingModal;