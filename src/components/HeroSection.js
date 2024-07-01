import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/views/HeroSection.scss';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate("/products");
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover Our Latest Collection</h1>
        <p>Explore the new arrivals in electronics, fashion, home, and more.</p>
        <button onClick={handleShopNowClick} className="cta-button">Shop Now</button>
      </div>
    </section>
  );
};

export default HeroSection;
