import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import UpdateEmployeeSVG from '../../SVGs/EmployeeModal/UpdateEmployee';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const UpdateEmployeeModal = () => {
  //variables/data needed for updating an emp.
  const [email, setEmailToUpdate] = useState('');
  const [key, setKeyToUpdate] = useState('first_name');
  const [new_value, setNewValue] = useState('');

  const [result, setResult] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //options for axios
    const options = {
      method: 'PUT',
      url: 'https://postoffice-api.herokuapp.com/api/update-employee',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email,
        key,
        new_value
      },
    };
    //Sanity checking
    if (key === "is_employed" && (new_value !== "0" && new_value !== "1")) {
      alert("Employment must be 0 or 1.");
      setIsOpen(false);
      return;
    }

    //Handle the response data
    try {
      const response = await axios.request(options);

      console.log(response.data);
      setResult(response.data);
      alert('Employee Updated')
    } catch (error) {
      console.error(error);
      setResult(`error`);
      alert(result);
    }

    console.log('Employee update submitted');
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="SVG-button" onClick={() => setIsOpen(true)}>
        <UpdateEmployeeSVG width='50' height='50' onClick={() => setIsOpen(true)} />
        <p className="button-text">Update Employee</p>
      </div>
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

        <h2>Update an Employee</h2>
        <div className="container-register">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email of Employee to update:
              <input
                value={email}
                onChange={(e) => setEmailToUpdate(e.target.value)}
                type="text" id="email" name="email"
                required
              />
            </label>
            <label htmlFor="key">
              Detail to update:
              <select value={key} onChange={(event) => setKeyToUpdate(event.target.value)}>
                <option value="first_name">First Name</option>
                <option value="last_name">Last Name</option>
                <option value="phone_number">Phone Number</option>
                <option value="start_date">Start Date</option>
                <option value="branch_address">Branch Address</option>
                {/*FIXME: This should offer true/false instead of being required to type 1/0*/}
                <option value="is_employed">Employment</option>
              </select>
            </label>
            <label htmlFor="value">
              New value:
              <input
                value={new_value}
                onChange={(e) => setNewValue(e.target.value)}
                type="text" id="newValue" name="newValue"
                required
              />
            </label>
            <button>Submit</button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default UpdateEmployeeModal;