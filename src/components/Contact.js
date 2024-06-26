import React from 'react';
import '../styles/views/Contact.scss';
import { useNavigate } from 'react-router-dom';

const Contact = () => {
    const navigate = useNavigate();

  const handleVendorClick = () => {
    navigate("/vendor")
  };

  const handleUserClick = () => {
    navigate("/contact-form")
  }

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>We are here to assist you. Whether you have questions, need support, or are interested in becoming a vendor, we're here to help.</p>

      <div className="contact-section">
        <h3>Need Help?</h3>
        <p>If you have any questions or need support, please contact our customer service team.</p>
        <button className="contact-button" onClick={handleUserClick}>Contact Us</button>
      </div>

      <div className="contact-section">
        <h3>Become a Vendor</h3>
        <p>If you are interested in becoming a vendor and selling your products on our platform, click the button below to apply.</p>
        <button className="contact-button" onClick={handleVendorClick}>Become a Vendor</button>
      </div>
    </div>
  );
};

export default Contact;
