import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
Modal.setAppElement('#root'); // Set the app root element for accessibility

const ReadShipmentModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [emailresult, setEmailResult] = useState(null);

    const [resultIsShown, setResultShown] = useState(null);
    const [email, setEmail] = useState('');
    const [shipmentType, setShipmentType] = useState('');

    const handleSubmit = async (event) => {
    event.preventDefault();
    //Handle the response data
    
    //Override anything put in the email form if radio is ticked
    if (shipmentType === 'all')
    {
        console.log(shipmentType);

        const options = {
            method: 'GET',
            url: 'https://postoffice-api.herokuapp.com/api/shipments',
            headers: {'Content-Type': 'application/json'},
        };

        try { //TODO format data in html
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
            url: 'https://postoffice-api.herokuapp.com/api/user-shipments',
            headers: {'Content-Type': 'application/json'},
            data : {
                email,
            }
        };
        try { //TODO format data in html
            
            
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
  };

  useEffect(() => {
    if (!isOpen) {
      setShipmentType('');
      setEmail('');
    }
  }, [isOpen]);

  const validateForm = () => {
    return email !== '' || shipmentType !== '';
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Read Shipment</button>
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

        <h2>Read Shipments</h2>

        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div>
            <input type="radio" name="shipment-type" value="all" checked={shipmentType === 'all'} onChange={(e) => setShipmentType(e.target.value)} />
            <label htmlFor="all">All Shipments</label>
          </div>

            <button type="submit" disabled={!validateForm()}>Submit</button>
        </form>

        {/*Conditional Rendering*/}
        {
          emailresult && (
        <>
          <h4>All shipments from <br/>Email: {email}</h4>
          <table>
            <thead>
              <tr>
                <th>Tracking ID</th>
                <th>Tracking status</th>
                <th>Estimate delivery date</th>
                <th>Shipment status</th>
                <th>Number of packages</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through shipment json data 
              and render to front end*/}
              {emailresult?.map((shipment) => {
                return (
                  <tr>
                    <th>{shipment.shipment_tracking_id}</th>
                    <th>{String(shipment.tracking_status)}</th>
                    <th>{shipment.est_delivery_date.slice(0,10)}</th>
                    <th>{shipment.shipment_status}</th>
                    <th>{shipment.num_packages}</th>
                  </tr>
                );
              })}

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
                <th>Tracking ID</th>
                <th>Tracking status</th>
                <th>Creation date</th>
                <th>Current location</th>
                <th>Shipment status</th>
                <th>Number of packages</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through shipment json data 
              and render to front end*/}
              {result?.map((shipment) => {
                return (
                  <tr>
                    <th>{shipment.tracking_id}</th>
                    <th>{String(shipment.tracking_status)}</th>
                    <th>{shipment.creation_date.slice(0,10)}</th>
                    <th>{shipment.current_location}</th>
                    <th>{shipment.shipment_status}</th>
                    <th>{shipment.num_packages}</th>
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

export default ReadShipmentModal;