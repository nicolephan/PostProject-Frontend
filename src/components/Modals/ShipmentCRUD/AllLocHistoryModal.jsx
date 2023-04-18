import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import ReadJobSVG from '../../SVGs/JobModal/ReadJob';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const AllLocHistoryModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [emailresult, setEmailResult] = useState(null);

  const [resultIsShown, setResultShown] = useState(null);
  const [email, setEmail] = useState('');
  const [shipmentType, setShipmentType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Handle the response data

        const options = {
            method: 'GET',
            url: 'https://postoffice-api.herokuapp.com/api/loc-history',
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
      <button onClick={() => setIsOpen(true)}>Location History</button>
      {/* <button onClick={() => setIsOpen(true)}>Read Shipment</button> */}
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

        <h2>All Location History</h2>

        <form onSubmit={handleSubmit}>
            <button type="submit" >Submit</button>
        </form>

        {/*Conditional Rendering*/}
        {
          result && (
        <>
          <h4>All Location History</h4>
          <table>
            <thead>
              <tr>
                <th>Location Hist ID</th>
                <th>Tracking_id</th>
                <th>Location</th>
                <th>region</th>
                <th>Date arrived</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through shipment json data 
              and render to front end*/}
              {result?.map((job) => {
                return (
                  <tr>
                    <th>{job.loc_hist_id}</th>
                    <th>{job.tracking_id}</th>
                    <th>{job.location}</th>
                    <th>{job.region}</th>
                    <th>{job.date_arrived.slice(0,10)}</th>
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

export default AllLocHistoryModal;