import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import DeleteCustomerSVG from '../../SVGs/CustomerModal/DeleteCust';

const DeleteCustomerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);
  const [email, setCustomerEmail] = useState('');
  const [new_value, setMarkDeletion] = useState(null);
  const key = 'is_active';

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Handle the response data

    console.log(new_value);

    //HTTP PUT request to update status
    // api/update-status : PUT
    const options = {
        method: 'PUT',
        url: 'https://postoffice-api.herokuapp.com/api/update-customer',
        headers: {'Content-Type': 'application/json'},
        data: { 
                email,
                key,
                new_value,
            },
    };
  
      //Handle the response data
    try {
      const response = await axios.request(options);

    // const formattedDate = new Date(response.data.creation_date).toLocaleDateString('en-US');
    // shipment.creation_date = formattedDate;

      console.log(response.data);
      setResult(response.data);
      (new_value === 0) ? alert('Customer Deleted') : alert('Customer Restored')
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
    setCustomerEmail('');
    setMarkDeletion(null);
};

const handleRadioChange = (event) => {
    const value = Number(event.target.value);
    setMarkDeletion(value);
};



  return (
    <>
    <div className="SVG-button">
      <DeleteCustomerSVG onClick={() => setIsOpen(true)} width='50' height='50'/>
      <p className="button-text">Delete Customer</p>
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

        <h2>Delete a Customer</h2>
        <form onSubmit={handleSubmit}>
        
            <label className="label">Customer Email:</label>
            <input
                required
                value={email}
                onChange={(event) => setCustomerEmail(event.target.value)}
            />

                <div className="radio-group">
                    <label>
                        <input
                            type="radio"
                            name="delete-restore"
                            value="0"
                            checked={new_value === 0}
                            onChange={handleRadioChange}
                        />
                        Delete
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="delete-restore"
                            value="1"
                            checked={new_value === 1}
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

export default DeleteCustomerModal;