import React from 'react';
import '../styles/views/HeroSection.scss';

const HeroSection = () => {
  
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h1>Discover Our Latest Collection</h1>
        <p>Explore the new arrivals in electronics, fashion, home, and more.</p>
        <a href="/shop" className="cta-button">Shop Now</a>
      </div>
    </section>
  );
};

export default HeroSection;
