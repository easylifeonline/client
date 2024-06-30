import React from 'react';
import '../styles/views/PopupForAll.scss';

const Popup = ({ title, message, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>{title}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
