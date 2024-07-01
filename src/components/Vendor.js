import React, { useState } from 'react';
import '../styles/views/Vendor.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faFileAlt, faPaperPlane, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import Popup from './VendorPopup';

const Vendor = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [popupContent, setPopupContent] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleVendorClick = () => {
    if (!user) {
      navigate("/register");
    } else {
      navigate("/vendor-contact-form");
    }
  };

  const handlePopupOpen = (content) => {
    setPopupContent(content);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setPopupContent('');
  };

  return (
    <div className="vendor-container">
      <h2>Welcome to Our Vendor Program</h2>
      <p>Join our platform and expand your business by reaching a larger audience. Here are some advantages and steps to get started as a vendor on our platform.</p>

      <div className="section">
        <h3>Advantages of Becoming a Vendor</h3>
        <ul>
          <li>Access to a large customer base</li>
          <li>Easy product listing and management</li>
          <li>Secure payment processing</li>
          <li>Comprehensive sales analytics and reports</li>
          <li>Dedicated vendor support</li>
        </ul>
      </div>

      <div className="section">
        <h3>Steps to Become a Vendor</h3>
        <div className="steps-container">
          <div className="step-box">
            <div className="step-number">
              <FontAwesomeIcon icon={faUserPlus} className="step-icon" />
              1
            </div>
            <div className="step-description">Sign up for an account</div>
          </div>
          <div className="step-box">
            <div className="step-number">
              <FontAwesomeIcon icon={faFileAlt} className="step-icon" />
              2
            </div>
            <div className="step-description">Fill out the vendor application form</div>
          </div>
          <div className="step-box">
            <div className="step-number">
              <FontAwesomeIcon icon={faPaperPlane} className="step-icon" />
              3
            </div>
            <div className="step-description">Submit your application for review</div>
          </div>
          <div className="step-box">
            <div className="step-number">
              <FontAwesomeIcon icon={faCheckCircle} className="step-icon" />
              4
            </div>
            <div className="step-description">Get approved and start listing your products</div>
          </div>
        </div>
      </div>

      <div className="section">
        <h3>{user ? 'Become a Vendor' : 'Sign up to Become a Vendor'}</h3>
        <p>Ready to join our platform and start selling your products? Click the button below to get started.</p>
        <button className="vendor-button" onClick={handleVendorClick}>
          {user ? 'Become a Vendor' : 'Sign Up'}
        </button>
      </div>

      <div className="section">
        <h3>Important Information</h3>
        <p>Make sure to review our vendor policies and guidelines to ensure a smooth onboarding process and successful experience on our platform.</p>
        <ul>
          <li onClick={() => navigate('/vendor-policies-guidelines')}>Vendor policies and guidelines</li>
          <li onClick={() => handlePopupOpen('Product listing requirements content goes here.')}>Product listing requirements</li>
          <li onClick={() => handlePopupOpen('Payment and commission details content goes here.')}>Payment and commission details</li>
          <li onClick={() => handlePopupOpen('Support and contact information content goes here.')}>Support and contact information</li>
        </ul>
      </div>

      {showPopup && (
        <Popup content={popupContent} onClose={handlePopupClose} />
      )}
    </div>
  );
};

export default Vendor;
