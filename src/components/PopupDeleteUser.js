import React from 'react';
import '../styles/views/PopupDeleteUser.scss';

const PopupDeleteUser = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <h3>Confirm Action</h3>
        <p>{message}</p>
        <div className="popup-buttons">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Proceed</button>
        </div>
      </div>
    </div>
  );
};

export default PopupDeleteUser;
