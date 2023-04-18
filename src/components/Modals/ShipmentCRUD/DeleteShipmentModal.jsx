import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import DeleteShipSVG from '../../SVGs/ShipModal/DeleteShip';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const DeleteShipmentModal = () => {
        const [isOpen, setIsOpen] = useState(false);
        const [result, setResult] = useState(null);
        const [tracking_id, setTrackingID] = useState('');
        const [mark_deletion, setMarkDeletion] = useState(null);



        const handleSubmit = async (event) => {
            event.preventDefault();
            //Handle the response data

            console.log(tracking_id);
            console.log(mark_deletion);

            //HTTP PUT request to update status
            // api/update-status : PUT
            const options = {
                method: 'PUT',
                url: 'https://postoffice-api.herokuapp.com/api/delete-shipment',
                headers: {'Content-Type': 'application/json'},
                data: { 
                        tracking_id,
                        mark_deletion,
                    },
            };
          
              //Handle the response data
            try {
            const response = await axios.request(options);
        
            // const formattedDate = new Date(response.data.creation_date).toLocaleDateString('en-US');
            // shipment.creation_date = formattedDate;
        
            console.log(response.data);
            setResult(response.data);
            (mark_deletion === 1) ? alert('Shipment Deleted') : alert('Shipment Restored')
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
            setMarkDeletion(null);
        };

        const handleRadioChange = (event) => {
            const value = Number(event.target.value);
            setMarkDeletion(value);
        };


    return (
        <>
        <div className="SVG-button" onClick={() => setIsOpen(true)}>
            <DeleteShipSVG width='50' height='50'/>
            <p className="button-text">Delete Shipment</p>
        </div>
        {/* <button onClick={() => setIsOpen(true)}>Delete Shipment</button> */}
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

            <h2>Delete a Shipment</h2>
            <form onSubmit={handleSubmit}>
            
                <label className="label">Tracking ID:</label>
                <input
                    required
                    value={tracking_id}
                    onChange={(event) => setTrackingID(event.target.value)}
                />

                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                name="delete-restore"
                                value="1"
                                checked={mark_deletion === 1}
                                onChange={handleRadioChange}
                            />
                            Delete
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="delete-restore"
                                value="0"
                                checked={mark_deletion === 0}
                                onChange={handleRadioChange}
                            />
                            Restore
                        </label>
                    </div>


                <button type="submit">Submit</button>
            </form>
        </Modal>
        </>
        
        )
}

export default DeleteShipmentModal;