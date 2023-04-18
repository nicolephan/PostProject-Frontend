import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import CreateEmployeeSVG from '../../SVGs/EmployeeModal/CreateEmployee';

const CreateEmployeeModal = () => {
  return (
    // <div>CreateEmployeeModal</div>
    <div className="SVG-button">
      <CreateEmployeeSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Create Employee (not created)</p>
    </div>
  )
}

export default CreateEmployeeModal;