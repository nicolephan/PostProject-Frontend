import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import DeleteEmployeeSVG from '../../SVGs/EmployeeModal/DeleteEmployee';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const DeleteEmployeeModal = () => {
  const [email, setEmailToUpdate] = useState('');
  const key = 'is_employed';
  const new_value = '0';

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

    //Handle the response data
    try {
      const response = await axios.request(options);

      console.log(response.data);
      setResult(response.data);
      alert('Employee Deleted')
    } catch (error) {
      console.error(error);
      setResult(`error`);
      alert(result);
    }

    console.log('Employee delete submitted');
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="SVG-button" onClick={() => setIsOpen(true)}>
        <DeleteEmployeeSVG width='50' height='50' onClick={() => setIsOpen(true)} />
        <p className="button-text">Delete Employee</p>
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

        <h2>Delete an Employee</h2>
        <div className="container-register">
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">
              Email of Employee to delete:
              <input
                value={email}
                onChange={(e) => setEmailToUpdate(e.target.value)}
                type="text" id="email" name="email"
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

export default DeleteEmployeeModal;