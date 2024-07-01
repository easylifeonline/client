import React, { useState } from 'react';
import '../styles/views/Contact.scss';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import api from '../helpers/api'; 
import Loader from './Loader'; 
import Popup from './Popup'; 

const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    subject: '',
    message: '',
    customSubject: ''
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); 
  const [popup, setPopup] = useState({ show: false, title: '', message: '' }); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

    // Navigate to /vendor if subject is Vendor Application
    if (name === 'subject' && value === 'Vendor Application') {
      navigate('/vendor');
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/knowledge-base/search?q=${searchQuery}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('contact/', formData);
      setPopup({ show: true, title: 'Success', message: 'Thank you for contacting us. We will get back to you soon!' });
      setFormData({ name: '', email: '', role: '', subject: '', message: '', customSubject: '' });
    } catch (error) {
      setPopup({ show: true, title: 'Error', message: 'Failed to submit the form. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopup({ show: false, title: '', message: '' });
  };

  return (
    <div className="contact-us-container">
      <h2>Contact Us</h2>
      <p>We're here to help! Whether you're a customer or a vendor, you can reach out to us using the form below, or through our support channels.</p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="role">I am a</label>
          <select id="role" name="role" value={formData.role} onChange={handleChange} required>
            <option value="" disabled>Select your role</option>
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <select id="subject" name="subject" value={formData.subject} onChange={handleChange} required>
            <option value="" disabled>Select a subject</option>
            <option value="Order Issue">Order Issue</option>
            <option value="Product Inquiry">Product Inquiry</option>
            <option value="Vendor Application">Vendor Application</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {formData.subject === 'Other' && (
          <div className="form-group">
            <label htmlFor="customSubject">Custom Subject</label>
            <input type="text" id="customSubject" name="customSubject" value={formData.customSubject} onChange={handleChange} required />
          </div>
        )}

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          Submit
          {loading && <Loader />}
        </button>
      </form>

      <div className="support-info">
        <h3>FAQs and Knowledge Base</h3>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search the knowledge base..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <button type="submit">Search</button>
        </form>
        <p>Find quick answers to common questions in our <a href="/faqs">FAQs</a> and <a href="/knowledge-base">Knowledge Base</a>.</p>

        <h3>Other Ways to Reach Us</h3>
        <p>Email: <a href="mailto:support@easylife.com">support@easylife.com</a></p>
        <p>Phone: +1 234 567 890</p>
        <p>Operating Hours: Mon-Fri, 9am - 6pm</p>

        <h3>Follow Us</h3>
        <div className="social-media-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
        </div>
      </div>

      {popup.show && (
        <Popup title={popup.title} message={popup.message} onClose={closePopup} />
      )}
    </div>
  );
};

export default Contact;





