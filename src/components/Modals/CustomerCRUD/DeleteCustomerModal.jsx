import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import DeleteCustomerSVG from '../../SVGs/CustomerModal/DeleteCust';

const DeleteCustomerModal = () => {
  return (
    // <div>DeleteCustomerModal</div>
    <div className="SVG-button">
      <DeleteCustomerSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Delete Customer (not created)</p>
    </div>
  )
}

export default DeleteCustomerModal;