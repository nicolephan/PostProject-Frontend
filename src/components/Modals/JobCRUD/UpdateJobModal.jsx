import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import UpdateJobSVG from '../../SVGs/JobModal/UpdateJob';

const UpdateJobModal = () => {
  return (
    // <div>UpdateJobModal</div>
    <div className="SVG-button">
      <UpdateJobSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Update Job (not created)</p>
    </div>
  )
}

export default UpdateJobModal;