import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';

const CreateCustomerModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null);

  //Vars for customer registration
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [home_address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');


  var todayDate = new Date(); todayDate.setMinutes(todayDate.getMinutes() - todayDate.getTimezoneOffset()); 
  var creation_date = todayDate.toISOString().slice(0,10);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //TODO handle on submit logic here

    const options = {
      method: 'POST',
      url: 'https://postoffice-api.herokuapp.com/api/register-customer',
      headers: {'Content-Type': 'application/json'},
      data: { email, password, first_name, last_name, home_address },
    };

    //Handle the response data
    try {

      // const formattedDate = new Date(response.data.creation_date).toLocaleDateString('en-US');
      // shipment.creation_date = formattedDate;

      const response = await axios.request(options);
      console.log(response);
      if (response.status === 201)
      {
        console.log("Customer Created");
        alert(`Customer profile created for: ${first_name} ${last_name}.`);
      }
    } catch (error) {
      console.error(error);
      setResult(`Error creating customer`);
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
      <button onClick={() => setIsOpen(true)}>Create Customer</button>
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

        <h2>Create a Customer</h2>
        <div className="container-register">
            <form onSubmit={handleSubmit}>
                <label htmlFor="fName">
                    First Name:
                    <input 
                        value={first_name} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        type="text" id="fname" name="fname" 
                        required
                    />
                </label>
                <label htmlFor="lName">
                    Last Name:
                    <input 
                        value={last_name} 
                        onChange={(e) => setLastName(e.target.value)} 
                        type="text" id="lname" name="lname" 
                        required
                    />
                </label>
                <label htmlFor="email">
                    Email:
                    <input 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        type="email" id="email" name="email" 
                        required
                    />
                </label>
                <label htmlFor="address">
                    Address:
                    <input 
                        value={home_address} 
                        onChange={(e) => setAddress(e.target.value)} 
                        type="text" id="address" name="address" 
                        required
                    />
                </label>
                <label htmlFor="password">
                    Password:
                    <input 
                        value={password} 
                        onChange={(e) => setPass(e.target.value)} 
                        type="password" id="password" name="password" 
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

export default CreateCustomerModal;