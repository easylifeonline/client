import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin, faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "../styles/views/Footer.scss";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2>About EasyLife Marketplace</h2>
          <p>EasyLife Marketplace is dedicated to connecting vendors with customers through a seamless and user-friendly platform. We strive to offer the best shopping experience with a wide variety of products and excellent customer service.</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li><span onClick={() => navigate("/")}>Home</span></li>
            <li><span onClick={() => navigate("/about")}>About</span></li>
            <li><span onClick={() => navigate("/contact")}>Contact</span></li>
            <li><span onClick={() => navigate("/terms")}>Terms of Service</span></li>
            <li><span onClick={() => navigate("/privacy")}>Privacy Policy</span></li>
            <li><span onClick={() => navigate("/helpcenter")}>Help Center</span></li>
            <li><span onClick={() => navigate("/faqs")}>FAQs</span></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Info</h2>
          <p>Email: info@easylifemarketplace.com</p>
          <p>Phone: +123 456 7890</p>
          <div className="social-icons">
            <a href="https://linkedin.com" aria-label="LinkedIn">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
            <a href="https://github.com" aria-label="GitHub">
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://instagram.com" aria-label="Instagram">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href="mailto:info@easylifemarketplace.com" aria-label="Email">
              <FontAwesomeIcon icon={faEnvelope} size="2x" />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 EasyLife Marketplace. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

