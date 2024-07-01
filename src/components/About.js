import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/views/About.scss';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us">
      <h2>About EasyLife</h2>

      <section>
        <h3>Introduction</h3>
        <p>
          Welcome to EasyLife, your premier destination for an exceptional online shopping experience. Founded in 2024, EasyLife connects vendors and businesses with customers worldwide, bringing the best of e-commerce to your fingertips.
        </p>
      </section>

      <section>
        <h3>Our Mission</h3>
        <p>
          At EasyLife, our mission is to empower small businesses and vendors to reach a broader audience while providing customers with a diverse range of high-quality products. We believe in creating opportunities for growth and success for every business, no matter how small.
        </p>
      </section>

      <section>
        <h3>Our Vision</h3>
        <p>
          We aspire to revolutionize online shopping by creating a seamless and enjoyable experience for both vendors and customers. Our vision is to become the go-to platform for online shopping, known for our innovation, customer service, and community involvement.
        </p>
      </section>

      <section>
        <h3>Our Values</h3>
        <ul>
          <li><strong>Integrity</strong>: We operate with honesty and transparency in all our interactions.</li>
          <li><strong>Customer Focus</strong>: Our customers are at the heart of everything we do.</li>
          <li><strong>Innovation</strong>: We continuously innovate to improve the shopping experience.</li>
          <li><strong>Quality</strong>: We are committed to providing high-quality products and services.</li>
          <li><strong>Community</strong>: We believe in giving back to the community and supporting sustainable practices.</li>
        </ul>
      </section>

      <section>
        <h3>Unique Selling Propositions</h3>
        <ul>
          <li>Wide Range of Products: Discover a diverse selection of products from vendors around the world.</li>
          <li>Secure Payments: Shop with confidence with our secure payment processing.</li>
          <li>User-Friendly Interface: Enjoy a seamless and intuitive shopping experience.</li>
          <li>Vendor Support: Access tools and resources to help your business thrive.</li>
        </ul>
      </section>

      <section>
        <h3>Customer Commitment</h3>
        <p>
          We are dedicated to ensuring your satisfaction with every purchase. Our customer service team is available to assist you with any questions or concerns, and our flexible return policy ensures a hassle-free shopping experience.
        </p>
      </section>

      <section>
        <h3>Supporting Our Vendors</h3>
        <p>
          EasyLife provides vendors with a platform to grow their business. With comprehensive sales analytics, secure payment processing, and dedicated support, we help vendors succeed and reach a wider audience.
        </p>
      </section>

      <section>
        <h3>Technological Innovation</h3>
        <p>
          Our platform leverages cutting-edge technology to provide a fast, secure, and enjoyable shopping experience. From advanced search features to personalized recommendations, we are always looking for ways to enhance your experience.
        </p>
      </section>

      <section>
        <h3>Community and Social Responsibility</h3>
        <p>
          EasyLife is committed to making a positive impact on the community. We partner with charitable organizations and promote sustainable practices to ensure a better future for all.
        </p>
      </section>

      <section>
        <h3>Achievements and Milestones</h3>
        <p>
          Since our launch, we have reached several significant milestones, including [notable achievements, awards, or partnerships].
        </p>
      </section>

      <section>
        <h3>Future Plans</h3>
        <p>
          We are excited about the future and are continuously working on new features and improvements. Stay tuned for [upcoming features or initiatives].
        </p>
      </section>

      <section>
        <h3>Join Us</h3>
        <p>
          Explore our platform, discover amazing products, and become a part of the EasyLife community.
        </p>
        <div className="links-container">
          <span className="link" onClick={() => navigate('/products')}>Start Shopping</span> | 
          <span className="link" onClick={() => navigate('/vendor')}>Become a Vendor</span> | 
          <span className="link" onClick={() => navigate('/contact')}>Contact Us</span>
        </div>
      </section>

      <div className="easylife-team">
        <strong>EasyLife Team</strong>
      </div>
    </div>
  );
};

export default About;


