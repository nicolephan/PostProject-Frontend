import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import '../shippingModal.css';
import ReadJobSVG from '../../SVGs/JobModal/ReadJob';

const ReadJobModal = () => {
  return (
    // <div>ReadJobModal</div>
    <div className="SVG-button">
      <ReadJobSVG width='50' height='50'/>
      {/* onClick={() => setIsOpen(true)} */}
      <p className="button-text">Read Job (not created)</p>
    </div>
  )
}

export default ReadJobModal;