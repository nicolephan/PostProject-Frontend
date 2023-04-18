import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import CreateJobSVG from '../../SVGs/JobModal/CreateJob';

const CreateJobModal = () => {
  return (
    // <div>CreateJobModal</div>
    <div className="SVG-button" > {/* onClick={() => setIsOpen(true)} */}
      <CreateJobSVG width='50' height='50'/>
      <p className="button-text">Create Job (not created)</p>
    </div>
  )
}

export default CreateJobModal;