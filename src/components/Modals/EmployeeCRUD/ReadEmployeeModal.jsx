import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import ReadEmployeeSVG from '../../SVGs/EmployeeModal/ReadEmployee';

const ReadEmployeeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [result, setResult] = useState(null); //for ALL button
  const [emailresult, setEmailResult] = useState(null);
  const [email, setEmail] = useState('');
  
  const [employeeType, setEmployeeType] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    //Handle the response data
    
    //Override anything put in the email form if radio is ticked
    if (employeeType === 'all')
    {
        console.log(employeeType);
  
        const options = {
            method: 'GET',
            url: 'https://postoffice-api.herokuapp.com/api/employees',
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
    //Handles individual query of email input
    else 
    {
        //console.log(email)
        const options = {
            method: 'POST',
            url: 'https://postoffice-api.herokuapp.com/api/employee-info',
            headers: {'Content-Type': 'application/json'},
            data : {
                email,
            }
        };
        try {
            
            
            const response = await axios.request(options);
            //console.log(response.data);
            setEmailResult(response.data);
            
        } catch (error) {
            console.error(error);
            setResult(`error`);
        }
      
    }
  
    
  
    console.log(`Submitted`);
    setIsOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsOpen(false);
    setResult(null);
    setEmailResult(null);
    setEmail(null);
  };
  
  useEffect(() => {
    if (!isOpen) {
      setEmployeeType('');
      setEmail('');
    }
  }, [isOpen]);
  
  const validateForm = () => {
    return email !== '' || employeeType !== '';
  }
    


  return (
    <>
    <div className="SVG-button" onClick={() => setIsOpen(true)}>
    <ReadEmployeeSVG width='50' height='50'/>
      <p className="button-text">Read Employee</p>
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

        <h2>Read Employees</h2>

        <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <div>
            <input type="radio" name="employee-type" value="all" checked={employeeType === 'all'} onChange={(e) => setEmployeeType(e.target.value)} />
            <label htmlFor="all">All Employees</label>
          </div>

            <button type="submit" disabled={!validateForm()}>Submit</button>
        </form>

        {/*Conditional Rendering*/}
        {
          emailresult && (
        <>
          <h4>Employee Info <br/>Email: {email}</h4>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Start Date</th>
                <th>Phone Number</th>
                <th>Branch Address</th>
                <th>Username/Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Is Employed</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through response json data 
              and render to front end*/}

              <tr>
                <th>{emailresult.first_name}</th>
                <th>{emailresult.last_name}</th>
                <th>{emailresult.start_date.slice(0,10)}</th>
                <th>{emailresult.phone_number}</th>
                <th>{emailresult.branch_address}</th>
                <th>{emailresult.email}</th>
                <th>{emailresult.password}</th>
                <th>{emailresult.type}</th>
                <th>{String(emailresult.is_employed)}</th>
              </tr>


            </tbody>
          </table>
        </>
          )}

        {
          result && (
        <>
          <h4>All Employees</h4>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Start Date</th>
                <th>Phone Number</th>
                <th>Branch Address</th>
                <th>Username/Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Is Employed</th>
              </tr>
            </thead>
            <tbody>
              {/*Iterate through info json data 
              and render to front end*/}
              {
                Array.isArray(result) ?
                result?.map((result) => {
                  return (
                    <tr>
                      <th>{result.first_name}</th>
                      <th>{result.last_name}</th>
                      <th>{result.start_date.slice(0,10)}</th>
                      <th>{result.phone_number}</th>
                      <th>{result.branch_address}</th>
                      <th>{result.email}</th>
                      <th>{result.password}</th>
                      <th>{result.type}</th>
                      <th>{String(result.is_employed)}</th>
                    </tr>
                  );
                })
                :
                <p>No results found.</p>
              }
              
            </tbody>
          </table>
        </>
        )
        }

        
  
      </Modal>

    </>
  )
}

export default ReadEmployeeModal;