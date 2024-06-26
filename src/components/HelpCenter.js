import React from 'react';
import '../styles/views/HelpCenter.scss';

const HelpCenter = () => {
  return (
    <div className="help-center-container">
      <h2>Help Center</h2>
      <p>If you have any questions or need assistance, please refer to our FAQs or contact our support team.</p>
      <h3>Frequently Asked Questions</h3>
      <ul>
        <li><strong>How do I register for an account?</strong> - Click on the Sign-Up button on the homepage and fill in the required details.</li>
        <li><strong>How do I reset my password?</strong> - Click on the Forgot Password link on the login page and follow the instructions.</li>
        <li><strong>How do I contact customer support?</strong> - You can contact our support team via the Contact Us page.</li>
      </ul>
    </div>
  );
};

export default HelpCenter;
