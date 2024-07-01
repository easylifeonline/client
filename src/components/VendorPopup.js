import React from 'react';
import '../styles/views/Popup.scss';

const Popup = ({ content, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>{content}</p>
                <button onClick={onClose} className="popup-button">Ok</button>
            </div>
        </div>
    );
};

export default Popup;