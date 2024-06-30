import React from 'react';
import '../styles/views/PromotionalBanner.scss';

const PromotionalBanner = ({ image, title, subtitle }) => {
  return (
    <div className="promotional-banner">
      <img src={image} alt={title} className="banner-image" />
      <div className="banner-content">
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
};

export default PromotionalBanner;
