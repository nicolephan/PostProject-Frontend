import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import CreateEmployeeSVG from '../../SVGs/EmployeeModal/CreateEmployee';

Modal.setAppElement('#root'); // Set the app root element for accessibility

const CreateEmployeeModal = () => {
  //variables/data needed for creation of an emp.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setEmployeeType] = useState('employee');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [branch_address, setBranchAddr] = useState('123 Main St');
  const [phone_number, setPhoneNum] = useState('');
  const [start_date, setStartDate] = useState('');

  const [result, setResult] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    //options for axios
    const options = {
      method: 'POST',
      url: 'https://postoffice-api.herokuapp.com/api/register-employee',
      headers: { 'Content-Type': 'application/json' },
      data: {
        email,
        password,
        type,
        first_name,
        last_name,
        branch_address,
        phone_number,
        start_date,
      },
    };

    //Handle the response data
    try {
      const response = await axios.request(options);

      console.log(response.data);
      setResult(response.data);
      alert('Employee Created')
    } catch (error) {
      console.error(error);
      setResult(`error`);
      alert(result);
    }


    console.log('Employee creation submitted');
    setIsOpen(false);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="SVG-button" onClick={() => setIsOpen(true)}>
        <CreateEmployeeSVG width='50' height='50' onClick={() => setIsOpen(true)} />
        <p className="button-text">Create Employee</p>
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

        <h2>Create an Employee</h2>
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
            <label htmlFor="phoneNum">
              Phone Number:
              <input
                value={phone_number}
                onChange={(e) => setPhoneNum(e.target.value)}
                type="text" id="phoneNum" name="phoneNum"
                required
              />
            </label>
            <label htmlFor="startDate">
              Start Date:
              <input
                value={start_date}
                onChange={(e) => setStartDate(e.target.value)}
                type="text" id="startDate" name="startDate"
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
            <label htmlFor="password">
              Password:
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password" id="password" name="password"
                required
              />
            </label>
            <label htmlFor="branchAddress">
              Branch Address:
              <select value={branch_address} onChange={(event) => setBranchAddr(event.target.value)}>
                <option value="123 Main St">123 Main St</option>
                <option value="456 Elm St">456 Elm St</option>
                <option value="789 Oak St">789 Oak St</option>
              </select>
            </label>
            <label htmlFor="employeeType">
              Employee Type:
              <select value={type} onChange={(event) => setEmployeeType(event.target.value)}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </label>
            <button>Submit</button>
          </form>
        </div>
      </Modal>
    </>
  )
}

export default CreateEmployeeModal;