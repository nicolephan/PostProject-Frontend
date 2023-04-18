import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import UpdateCustomerSVG from '../../SVGs/CustomerModal/UpdateCust';

const UpdateCustomerModal = () => {
  return (
    // <div>UpdateCustomerModal</div>
    <div className="SVG-button">
      <UpdateCustomerSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Update Customer (not created)</p>
    </div>
  )
}

export default UpdateCustomerModal;