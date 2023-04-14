import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import './shippingModal.css';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const UpdateShipmentModal = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [result, setResult] = useState(null);
        const [tracking_id, setTrackingID] = useState('');
        const [shipment_status, setShipmentStatus] = useState('1');

        const handleSubmit = async (event) => {
            event.preventDefault();
            //Handle the response data

            console.log(tracking_id);
        }

        const handleCloseModal = () => {
            setIsOpen(false);
            setTrackingID('');
            setShipmentStatus('1');
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
            <select value={shipment_status} onChange={(event) => setShipmentStatus(event.target.value)}>
                <option value="1">Labeling</option>
                <option value="2">In Transit</option>
                <option value="3">Delivered</option>
                <option value="4">Stopped</option>
            </select>
            
            <button type="submit">Submit</button>
            </form>
        </Modal>
        </>
        
        )
}

export default UpdateShipmentModal;