import React from 'react';
import '../styles/views/GeneralPopup.scss';

const Popup = ({ title, message, onClose, isSuccess }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2 className="popup-title">{title}</h2>
        <p className={`popup-message ${isSuccess ? 'success' : 'error'}`}>{message}</p>
        <button onClick={onClose} className="popup-button">Close</button>
      </div>
    </div>
  );
};

export default Popup;