import React, { useState } from 'react';
import '../styles/views/VendorContactForm.scss';
import { useUser } from "./UserContext";
import api from "../helpers/api";
import { useNavigate } from 'react-router-dom';
import Popup from './Popup';

const VendorContactForm = () => {
  const { user } = useUser();
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: user ? user.email : '',
    phone: '',
    productTypes: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    description: '',
  });

  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("access_token");
      const response = await api.post('vendor-requests/', {
        business_name: formData.businessName,
        contact_person: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        product_types: formData.productTypes,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip_code: formData.zipCode,
        country: formData.country,
        description: formData.description
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Your application has been submitted. We will contact you soon.');
      navigate('/home');
    } catch (error) {
        console.error('Error submitting form:', error.response.data);
        if (error.response && error.response.status === 400 && error.response.data.detail) {
          setMessage(error.response.data.detail);
        } else {
          setMessage('There was an error submitting your application. Please try again.');
        }
        setShowPopup(true);
      }
    };
  
    const closePopup = () => {
      setShowPopup(false);
    };

  return (
    <div className="vendor-contact-form-container">
      <h2>Become a Vendor</h2>
      <p>Please fill out the form below to apply to become a vendor on our platform.</p>
      <form onSubmit={handleSubmit} className="vendor-contact-form">
        <div className="form-group">
          <label htmlFor="businessName">Business Name</label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            placeholder="Enter your business name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactPerson">Contact Person</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Enter the name of the contact person"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter your phone number"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productTypes">Type of Products</label>
          <textarea
            id="productTypes"
            name="productTypes"
            value={formData.productTypes}
            onChange={handleChange}
            placeholder="Describe the types of products you will be selling... eg: clothing, accessories, home goods, etc."
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your business address"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="state">State</label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="Enter your state"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            type="text"
            id="zipCode"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            placeholder="Enter your zip code"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country</label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Enter your country"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description of Your Business</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Provide a description of your business"
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
      {showPopup && <Popup message={message} onClose={closePopup} />}
    </div>
  );
};

export default VendorContactForm;