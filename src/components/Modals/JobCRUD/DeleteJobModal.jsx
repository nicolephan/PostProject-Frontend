import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import DeleteJobSVG from '../../SVGs/JobModal/DeleteJob';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const DeleteJobModal = () => {
  //variables/data needed for deleting a job
  const [id, setIDToUpdate] = useState('');
  const key = 'mark_deletion';
  const new_value = '1';

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

    //Handle the response data
    try {
      const response = await axios.request(options);

      console.log(response.data);
      setResult(response.data);
      alert('Job entry deleted')
    } catch (error) {
      console.error(error);
      setResult(`error`);
      alert(result);
    }

    console.log('Job delete submitted');
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setIDToUpdate('');
  };

  return (
    <>
      <div className="SVG-button" onClick={() => setIsOpen(true)}>
        <DeleteJobSVG width='50' height='50' onClick={() => setIsOpen(true)} />
        <p className="button-text">Delete Job Entry</p>
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

        <h2>Delete a Job Entry</h2>
        <div className="container-register">
          <form onSubmit={handleSubmit}>
            <label htmlFor="job">
              ID of job entry to delete:
              <input
                value={id}
                onChange={(e) => setIDToUpdate(e.target.value)}
                type="text" id="id" name="id"
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

export default DeleteJobModal;