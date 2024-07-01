import React from 'react';
import '../styles/views/Press.scss';

const Press = () => {
  return (
    <div className="press">
      <h2>Press</h2>
      <p>
        Welcome to the EasyLife Press Center. Here, you'll find the latest news, press releases, and media resources about our company and our journey to revolutionize the online shopping experience.
      </p>
      <p>
        At EasyLife, we are dedicated to creating a platform that brings together vendors and customers from around the world. Our innovative approach to e-commerce has garnered attention from media outlets, industry experts, and customers alike. We are proud to share our story and achievements with the world.
      </p>
      <p>
        If you're a member of the press and would like to learn more about EasyLife, please contact our media relations team at <a href="mailto:press@easylife.com">press@easylife.com</a>. We are happy to provide additional information, schedule interviews, and answer any questions you may have.
      </p>
      <h3>Press Releases</h3>
      <ul>
        <li><a href="/press-releases/easylife-launches-new-platform">EasyLife Launches New Platform to Connect Vendors and Customers</a></li>
        <li><a href="/press-releases/easylife-partners-with-top-brands">EasyLife Partners with Top Brands to Enhance Product Offerings</a></li>
        <li><a href="/press-releases/easylife-awarded-best-ecommerce-platform">EasyLife Awarded Best E-Commerce Platform 2024</a></li>
      </ul>
      <h3>Media Resources</h3>
      <ul>
        <li><a href="/media-kit">Download Our Media Kit</a></li>
        <li><a href="/brand-assets">Brand Assets</a></li>
        <li><a href="/company-factsheet">Company Factsheet</a></li>
      </ul>
    </div>
  );
};

export default Press;