import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './shippingModal.css';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const UpdateShipmentModal = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [result, setResult] = useState(null);
        const [tracking_id, setTrackingID] = useState('');
        const [status, setShipmentStatus] = useState('1');

        const handleSubmit = async (event) => {
            event.preventDefault();
            //Handle the response data

            console.log(tracking_id);
            console.log(status);

            //HTTP PUT request to update status
            // api/update-status : PUT
            const options = {
                method: 'PUT',
                url: 'https://postoffice-api.herokuapp.com/api/update-status',
                headers: {'Content-Type': 'application/json'},
                data: { 
                        tracking_id,
                        status,
                      },
              };
          
              //Handle the response data
              try {
                const response = await axios.request(options);
          
                // const formattedDate = new Date(response.data.creation_date).toLocaleDateString('en-US');
                // shipment.creation_date = formattedDate;
          
                console.log(response.data);
                setResult(response.data);
                alert('Shipment Updated')
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
            setTrackingID('');
            setShipmentStatus('Labeling');
        };

    return (
        <>
        <button onClick={() => setIsOpen(true)}>Update Shipment</button>
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

            <h2>Update a Shipment</h2>
            <form onSubmit={handleSubmit}>
            
            <label className="label">Tracking ID:</label>
            <input
                required
                value={tracking_id}
                onChange={(event) => setTrackingID(event.target.value)}
            />

            <label className="label">Shipment Status:</label>
            <select value={status} onChange={(event) => setShipmentStatus(event.target.value)}>
                <option value="Labeling">Labeling</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
                <option value="Stopped">Stopped</option>
            </select>
            
            <button type="submit">Submit</button>
            </form>
        </Modal>
        </>
        
        )
}

export default UpdateShipmentModal;