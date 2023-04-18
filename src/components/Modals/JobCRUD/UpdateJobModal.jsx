import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import UpdateJobSVG from '../../SVGs/JobModal/UpdateJob';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const UpdateJobModal = () => {
  //variables/data needed for updating an emp.
  const [id, setIDToUpdate] = useState('');
  const [key, setKeyToUpdate] = useState('work_name');
  const [new_value, setNewValue] = useState('');

  const [result, setResult] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //options for axios
    const options = {
      method: 'PUT',
      url: 'https://postoffice-api.herokuapp.com/api/update-job',
      headers: { 'Content-Type': 'application/json' },
      data: {
        id,
        key,
        new_value
      },
    };

    //Sanity checking
    if (key === "work_id") {
      alert('Cannot update the ID of the job entry.');
      setIsOpen(false);
      return;
    }

    if (key === "mark_deletion" && (new_value !== "0" && new_value !== "1")) {
      alert("Deletion must be 0 or 1.");
      setIsOpen(false);
      return;
    }

    //Handle the response data
    try {
      const response = await axios.request(options);

      console.log(response.data);
      setResult(response.data);
      alert('Job entry updated')
    } catch (error) {
      console.error(error);
      setResult(`error`);
      alert(result);
    }

    console.log('Job update submitted');
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIDToUpdate('');
    setNewValue('');
  };

  return (
    <>
      <div className="SVG-button" onClick={() => setIsOpen(true)}>
        <UpdateJobSVG width='50' height='50' onClick={() => setIsOpen(true)} />
        <p className="button-text">Update Job Entry</p>
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

        <h2>Update a Job Entry</h2>
        <div className="container-register">
          <form onSubmit={handleSubmit}>
            <label htmlFor="job">
              ID of job entry to update:
              <input
                value={id}
                onChange={(e) => setIDToUpdate(e.target.value)}
                type="text" id="id" name="id"
                required
              />
            </label>
            <label htmlFor="key">
              Detail to update:
              <select value={key} onChange={(event) => setKeyToUpdate(event.target.value)}>
                <option value="work_name">Work description</option>
                <option value="employee_email">Employee email</option>
                <option value="pay">Pay</option>
                <option value="on_date">Date</option>
                <option value="hours_worked">Hours worked</option>
                {/*FIXME: This should offer true/false instead of being required to type 1/0*/}
                <option value="mark_deletion">Deleted</option>
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

export default UpdateJobModal;