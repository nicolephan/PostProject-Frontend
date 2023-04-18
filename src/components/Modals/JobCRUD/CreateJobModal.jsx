import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import CreateJobSVG from '../../SVGs/JobModal/CreateJob';

const CreateJobModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);

  let currentDate = new Date().toJSON().slice(0, 10); // Get current date in format yyyy-mm-dd

  const [form, setForm] = React.useState({
      creation_date: currentDate,
  });

  // Save form input to variable
  const handleChange = (event) => {
      setForm({
      ...form,
      [event.target.id]: event.target.value,
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const options = {
      method: 'POST',
      url: 'https://postoffice-api.herokuapp.com/api/job',
      headers: {'Content-Type': 'application/json'},
      data: {
            work_name: form.work_name,
            employee_email: form.employee_email,
            pay: form.pay,
            hours_worked: form.hours_worked,
            on_date: form.on_date,
            },
    };

    //Handle the response data
    try {
      const response = await axios.request(options);

      console.log(response.data);
      setResult(response.data);
      alert('Job created')
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
      <div className="SVG-button">
        <CreateJobSVG onClick={() => setIsOpen(true)} width='50' height='50'/>
        <p className="button-text">Create Job</p>
      </div>
      {/* <button onClick={() => setIsOpen(true)}>Create Shipment</button> */}
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

        <h2>Create a Job</h2>
        <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="work_name">Work Name</label>
          <input
            id="work_name"
            type="text"
            value={form.work_name}
            onChange={handleChange}
          />
          <label htmlFor="employee_email">Employee email</label>
          <input
            id="employee_email"
            type="email"
            value={form.employee_email}
            onChange={handleChange}
          />
          <label htmlFor="pay">Pay</label>
          <input
            id="pay"
            type="number"
            value={form.pay}
            onChange={handleChange}
          />
          <label htmlFor="hours_worked">Hours worked</label>
          <input
            id="hours_worked"
            type="number"
            value={form.hours_worked}
            onChange={handleChange}
          />
          <label htmlFor="on_date">On date</label>
          <input 
            type="date" 
            id="on_date" 
            value={form.on_date} 
            onChange={handleChange} 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      </Modal>
    </>
  );
}

export default CreateJobModal;