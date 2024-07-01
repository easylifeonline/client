import React from 'react';
import '../styles/views/OurStory.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faHandshake, faUsers, faRocket } from '@fortawesome/free-solid-svg-icons';

const OurStory = () => {
  return (
    <div className="our-story">
      <h2>Our Story</h2>
      <p className="intro">
        Welcome to EasyLife, your one-stop destination for an exceptional online shopping experience. Founded with the vision of connecting vendors and businesses with customers worldwide, EasyLife aims to bring the best of e-commerce to your fingertips.
      </p>
      <div className="story-section">
        <div className="icon">
          <FontAwesomeIcon icon={faGlobe} size="3x" />
        </div>
        <div className="content">
          <h3>Our Beginning</h3>
          <p>
            Our journey began with a simple idea: to create a platform that empowers small businesses and vendors to reach a broader audience while providing customers with a diverse range of products. We believe that every business, no matter how small, deserves the opportunity to grow and thrive. That's why we've dedicated ourselves to building a marketplace that supports entrepreneurs and helps them succeed.
          </p>
        </div>
      </div>
      <div className="story-section">
        <div className="icon">
          <FontAwesomeIcon icon={faHandshake} size="3x" />
        </div>
        <div className="content">
          <h3>Building Connections</h3>
          <p>
            At EasyLife, we prioritize quality, convenience, and customer satisfaction. Our platform offers a seamless shopping experience, from browsing and purchasing to delivery and customer service. We are committed to ensuring that every interaction you have with us is smooth, enjoyable, and memorable.
          </p>
        </div>
      </div>
      <div className="story-section">
        <div className="icon">
          <FontAwesomeIcon icon={faUsers} size="3x" />
        </div>
        <div className="content">
          <h3>Our Team</h3>
          <p>
            Our team is a blend of passionate individuals from diverse backgrounds, all working together towards a common goal – to revolutionize the e-commerce experience. We pride ourselves on our collaborative spirit and innovative thinking.
          </p>
        </div>
      </div>
      <div className="story-section">
        <div className="icon">
          <FontAwesomeIcon icon={faRocket} size="3x" />
        </div>
        <div className="content">
          <h3>The Future</h3>
          <p>
            Join us on our mission to revolutionize online shopping. Whether you're a vendor looking to expand your business or a customer seeking unique and high-quality products, EasyLife is here to make your life easier and more fulfilling. We are committed to continually enhancing our platform to better serve our vendors and customers, making shopping easier, faster, and more enjoyable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default OurStory;