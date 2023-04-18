import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import ReadEmployeeSVG from '../../SVGs/EmployeeModal/ReadEmployee';

const ReadEmployeeModal = () => {
  return (
    // <div>ReadEmployeeModal</div>
    <div className="SVG-button">
    <ReadEmployeeSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Create Employee (not created)</p>
    </div>
  )
}

export default ReadEmployeeModal;