import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import DeleteJobSVG from '../../SVGs/JobModal/DeleteJob';

const DeleteJobModal = () => {
  return (
    // <div>DeleteJobModal</div>
    <div className="SVG-button"> {/* onClick={() => setIsOpen(true)} */}
      <DeleteJobSVG width='50' height='50'/>
      <p className="button-text">Delete Job (not created)</p>
    </div>
  )
}

export default DeleteJobModal;