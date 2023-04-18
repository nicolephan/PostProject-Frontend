import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import CreateJobSVG from '../../SVGs/JobModal/CreateJob';

const CreateJobModal = () => {
  return (
    // <div>CreateJobModal</div>
    <div className="SVG-button">
      <CreateJobSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Create Job (not created)</p>
    </div>
  )
}

export default CreateJobModal;