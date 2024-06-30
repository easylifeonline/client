import React, { useState } from 'react';
import '../styles/views/NewsletterSignup.scss';
import Popup from './GeneralPopup';
import api from "../helpers/api";

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupTitle, setPopupTitle] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('subscribe/', { email });
      setPopupTitle('Success');
      setPopupMessage('Thank you for subscribing!');
      setIsSuccess(true);
    } catch (error) {
      setPopupTitle('Error');
      if (error.response && error.response.data && error.response.data.email) {
        setPopupMessage(error.response.data.email[0]);
      } else {
        setPopupMessage('Failed to subscribe. Please try again.');
      }
      setIsSuccess(false);
    } finally {
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupMessage('');
  };

  return (
    <div className="newsletter-signup">
      <h2>Subscribe to Our Newsletter</h2>
      <p>Get updates on the latest products and offers.</p>
      <form onSubmit={handleSubscribe}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Subscribe</button>
      </form>
      {showPopup && (
        <Popup
          title={popupTitle}
          message={popupMessage}
          onClose={closePopup}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};

export default NewsletterSignup;
