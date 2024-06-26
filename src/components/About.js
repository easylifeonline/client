import React from 'react';
import '../styles/views/About.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faHandshake, faStar, faUserShield, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="about-container">
      <h1>About EasyLife</h1>
      <p>Welcome to EasyLife, your trusted E-Commerce Marketplace! We are committed to providing the best online shopping experience. Our platform connects vendors and customers, offering a wide range of products at competitive prices.</p>
      
      <h2>Our Mission</h2>
      <p>Our mission is to empower small businesses by providing them with a platform to reach a larger audience. We strive to offer a seamless shopping experience for our customers, with easy navigation, secure payment options, and reliable customer service.</p>
      
      <h2>Core Values</h2>
      <ul>
        <li><FontAwesomeIcon icon={faCheckCircle} size="lg" /> <span className="core-value integrity">Integrity</span>: We operate with honesty and integrity in all our dealings.</li>
        <li><FontAwesomeIcon icon={faUserShield} size="lg" /> <span className="core-value customer-focus">Customer Focus</span>: Our customers are at the heart of everything we do.</li>
        <li><FontAwesomeIcon icon={faLightbulb} size="lg" /> <span className="core-value innovation">Innovation</span>: We continuously seek innovative solutions to improve our services.</li>
        <li><FontAwesomeIcon icon={faStar} size="lg" /> <span className="core-value quality">Quality</span>: We are committed to providing high-quality products and services.</li>
        <li><FontAwesomeIcon icon={faHandshake} size="lg" /> <span className="core-value community">Community</span>: We support and empower our vendor community.</li>
      </ul>
      
      <h2>Why Choose Us</h2>
      <p>At EasyLife, we offer:</p>
      <ul>
        <li><FontAwesomeIcon icon={faCheckCircle} size="lg" /> A wide range of products at competitive prices</li>
        <li><FontAwesomeIcon icon={faCheckCircle} size="lg" /> Secure and easy payment options</li>
        <li><FontAwesomeIcon icon={faCheckCircle} size="lg" /> Reliable customer service</li>
        <li><FontAwesomeIcon icon={faCheckCircle} size="lg" /> Fast and reliable shipping</li>
        <li><FontAwesomeIcon icon={faCheckCircle} size="lg" /> A user-friendly shopping experience</li>
      </ul>
      
      <h2>Get in Touch</h2>
      <p>If you have any questions or need assistance, feel free to contact us through our <a href="/contact">Contact Us</a> page. We are here to help!</p>
    </div>
  );
};

export default About;

