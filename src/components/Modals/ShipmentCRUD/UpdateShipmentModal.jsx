import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { SMTPClient } from 'emailjs';
import '../shippingModal.css';
import UpdateShipSVG from '../../SVGs/ShipModal/UpdateShip';

Modal.setAppElement('#root'); // Set the app root element for accessibility

//Create client to send emails
const emailClient = new SMTPClient({
    user: 'databasedemons',
    password: process.env.EMAIL_PW,
    host: 'smtp.gmail.com',
    ssl: true,
});

const UpdateShipmentModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [result, setResult] = useState(null);
    const [tracking_id, setTrackingID] = useState('');
    const [status, setShipmentStatus] = useState('Labeling');
    const [location, setLocation] = useState('Houston');

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
            headers: { 'Content-Type': 'application/json' },
            data: {
                tracking_id,
                status,
                location,
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

        //Send an email to the owning customer that their shipment was updated
        await sendUpdateEmail(tracking_id, status, location);

        console.log(`PUT Submitted`);
        setIsOpen(false);
    }

    const handleCloseModal = () => {
        setIsOpen(false);
        setTrackingID('');
        setShipmentStatus('Labeling');
        setLocation('Houston');
    };

    return (
        <>
            <div className="SVG-button">
                <UpdateShipSVG onClick={() => setIsOpen(true)} width='50' height='50' />
                <p className="button-text">Update Shipment</p>
            </div>
            {/* <button onClick={() => setIsOpen(true)}>Update Shipment</button> */}
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

                    <div className='update-dds'>
                        <label className="label">Shipment Status:</label>
                        <select value={status} onChange={(event) => setShipmentStatus(event.target.value)}>
                            <option value="Labeling">Labeling</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Stopped">Stopped</option>
                        </select>

                        <label className="label">Current Location:</label>
                        <select value={location} onChange={(event) => setLocation(event.target.value)}>
                            <option value="Houston">Houston</option>
                            <option value="San Antonio">San Antonio</option>
                            <option value="Dallas">Dallas</option>
                            <option value="Austin">Austin</option>
                        </select>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </Modal>
        </>

    )
}

/**
 * Sends an email to the customer that owns the shipment letting
 * them know their package was updated.
 * @param {string} id ID of the shipment being updated
 * @param {string} status Status that the package was updated to
 * @param {string} location Location of the package after update
 */
async function sendUpdateEmail(id, status, location) {
    //Retrieve owner of shipment
    const options = {
        method: 'POST',
        url: 'https://postoffice-api.herokuapp.com/api/shipment',
        headers: { 'Content-Type': 'application/json' },
        data: {
            "tracking_id": id,
        },
    };

    try {
        const response = await axios.request(options);
        const custEmail = response.customer_email;

        const emailBody = `Your shipment (tracking ID: ${id})
                        has been updated to a status of ${status}
                        and is currently located in ${location}.`;
        let message = await emailClient.sendAsync({
            text: emailBody,
            from: 'Quickship <databasedemons@gmail.com>',
            to: custEmail,
            subject: 'Shipment Update',
        });
        console.log(message);
    } catch (err) {
        console.log("Got error while sending email:" + err);
    }
}

export default UpdateShipmentModal;