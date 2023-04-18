import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import ReadJobSVG from '../../SVGs/JobModal/ReadJob';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const ReadJobModal = () => {
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
            url: 'https://postoffice-api.herokuapp.com/api/job',
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
      <div className="SVG-button" onClick={() => setIsOpen(true)}>
        <ReadJobSVG onClick={() => setIsOpen(true)} width='50' height='50'/>
        <p className="button-text">Read Job</p>
      </div>
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

        <h2>Read Jobs</h2>

        <form onSubmit={handleSubmit}>
            <button type="submit" >Submit</button>
        </form>

        {/*Conditional Rendering*/}
        {
          result && (
        <>
          <h4>All Jobs</h4>
          <table>
            <thead>
              <tr>
                <th>Work id</th>
                <th>Work name</th>
                <th>Employee email</th>
                <th>Pay</th>
                <th>Hours worked</th>
                <th>On date</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through shipment json data 
              and render to front end*/}
              {result?.map((job) => {
                return (
                  <tr>
                    <th>{job.work_id}</th>
                    <th>{job.work_name}</th>
                    <th>{job.employee_email}</th>
                    <th>{job.pay}</th>
                    <th>{job.hours_worked}</th>
                    <th>{job.on_date.slice(0,10)}</th>
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

export default ReadJobModal;