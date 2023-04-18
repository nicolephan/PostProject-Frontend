import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import UpdateEmployeeSVG from '../../SVGs/EmployeeModal/UpdateEmployee';

const UpdateEmployeeModal = () => {
  return (
    // <div>UpdateEmployeeModal</div>
    <div className="SVG-button">
      <UpdateEmployeeSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Update Employee(not created)</p>
    </div>

  )
}

export default UpdateEmployeeModal;