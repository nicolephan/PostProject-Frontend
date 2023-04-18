import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import DeleteEmployeeSVG from '../../SVGs/EmployeeModal/DeleteEmployee';

const DeleteEmployeeModal = () => {
  return (
    // <div>DeleteEmployeeModal</div>
    <div className="SVG-button">
      <DeleteEmployeeSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Delete Employee (not created)</p>
    </div>
  )
}

export default DeleteEmployeeModal;