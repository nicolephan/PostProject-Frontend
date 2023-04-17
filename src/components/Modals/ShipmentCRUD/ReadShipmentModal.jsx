import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
Modal.setAppElement('#root'); // Set the app root element for accessibility

const ReadShipmentModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState(null);
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


        } catch (error) {
            console.error(error);
            setResult(`error`);
            alert(result);
        }
    }

    

    console.log(`Submitted`);
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
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

      </Modal>
    </>
  )
}

export default ReadShipmentModal;