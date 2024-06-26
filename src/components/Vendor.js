import React from 'react';
import '../styles/views/Vendor.scss';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const Vendor = () => {
    const navigate = useNavigate();
    const { user } = useUser();

    const handleVendorClick = () => {
        if (!user) {
          navigate("/register");
        } else {
          navigate("/vendor-contact-form");
        }
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
        <ol>
          <li>Sign up for an account</li>
          <li>Fill out the vendor application form</li>
          <li>Submit your application for review</li>
          <li>Get approved and start listing your products</li>
        </ol>
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
          <li>Vendor policies and guidelines</li>
          <li>Product listing requirements</li>
          <li>Payment and commission details</li>
          <li>Support and contact information</li>
        </ul>
      </div>
    </div>
  );
};

export default Vendor;