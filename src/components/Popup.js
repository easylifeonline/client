import React from 'react';
import PropTypes from 'prop-types';
import '../styles/views/Popup.scss';  // Importing styles for the popup

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Error</h2>
        <p>{message}</p>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

Popup.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;