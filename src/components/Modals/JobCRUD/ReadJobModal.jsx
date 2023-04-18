import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import ReadJobSVG from '../../SVGs/JobModal/ReadJob';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const ReadJobModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [id, setWorkID] = useState('');
  const [jobsResult, setJobsResult] = useState(null);
  const [jobType, setJobType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Handle the response data


      if (jobType === 'all') 
      {
        const options = {
          method: 'GET',
          url: 'https://postoffice-api.herokuapp.com/api/job',
          headers: {'Content-Type': 'application/json'},
        };

        try {
            const response = await axios.request(options);
            console.log(response.data);
            setResult(response.data);
          } catch (error) {
            console.error(error);
            setResult(`error`);
          }
      }
      else //handles individual query
      {
        //api/get-job-with-id
        const options = {
          method: 'POST',
          url: 'https://postoffice-api.herokuapp.com/api/get-job-with-id',
          headers: {'Content-Type': 'application/json'},
          data : {
              id,
          }
        };
        try {
            
            const response = await axios.request(options);
            //console.log(response.data);
            setJobsResult(response.data);
            //console.log(jobsResult);
            
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
    setJobsResult(null);
  };

  useEffect(() => {
    if (!isOpen) {
      setJobType('');
      setWorkID('');
    }
  }, [isOpen]);

  const validateForm = () => {
    return id !== '' || jobType !== '';
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
        <label>Work ID:</label>
          <input type="integer" value={id} onChange={(e) => setWorkID(e.target.value)} />

          <div>
            <input type="radio" name="job-type" value="all" checked={jobType === 'all'} onChange={(e) => setJobType(e.target.value)} />
            <label htmlFor="all">All Jobs</label>
          </div>

            <button type="submit" disabled={!validateForm()}>Submit</button>
        </form>



        {/*Conditional Rendering*/}
        {
          jobsResult && (
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
              <tr>
                <th>{jobsResult.work_id}</th>
                <th>{jobsResult.work_name}</th>
                <th>{jobsResult.employee_email}</th>
                <th>{jobsResult.pay}</th>
                <th>{jobsResult.hours_worked}</th>
                <th>{jobsResult.on_date.slice(0,10)}</th>
              </tr>
              
            </tbody>
          </table>
        </>
        )
        }

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