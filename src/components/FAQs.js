import React, { useState, useEffect } from 'react';
import '../styles/views/FAQs.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faUser, faShoppingCart, faCreditCard, faTruck, faInfoCircle, faGift, faEnvelope, faClipboard, faLock, faHeart, faLifeRing } from '@fortawesome/free-solid-svg-icons';
import initialQuestions from '../models/FAQsQuestions';

const categoryIcons = {
  'Account Management': { icon: faUser, color: '#ff5733' },
  'Support': { icon: faLifeRing, color: '#33c4ff' }, 
  'Payment Methods': { icon: faCreditCard, color: '#ff33d4' },
  'Orders': { icon: faShoppingCart, color: '#33ff3d' }, 
  'Vendor': { icon: faClipboard, color: '#8d33ff' }, 
  'Return Policy': { icon: faInfoCircle, color: '#ffc733' }, 
  'Shipping': { icon: faTruck, color: '#ff5733' }, 
  'Gift Cards': { icon: faGift, color: '#33ff89' }, 
  'Billing and Payment': { icon: faCreditCard, color: '#33a1ff' }, 
  'Newsletter': { icon: faEnvelope, color: '#ff33b8' },
  'Reviews': { icon: faClipboard, color: '#ff5733' },
  'Privacy': { icon: faLock, color: '#33ff95' }, 
  'Cart': { icon: faShoppingCart, color: '#ff9633' }, 
  'Wishlist': { icon: faHeart, color: '#ff3333' },
};

const FAQs = () => {
  const [visibleQuestions, setVisibleQuestions] = useState(initialQuestions);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      const filteredQuestions = initialQuestions.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setVisibleQuestions(filteredQuestions);
    } else {
      setVisibleQuestions(initialQuestions);
    }
  }, [searchQuery]);

  const groupedQuestions = visibleQuestions.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = [];
    }
    acc[curr.category].push(curr);
    return acc;
  }, {});

  const highlightText = (text, query) => {
    if (!query) return text;

    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === query.toLowerCase() ? <span key={index} className="highlight">{part}</span> : part
    );
  };

  return (
    <div className="faqs">
      <h2>Frequently Asked Questions</h2>
      <input
        type="text"
        className="search-bar"
        placeholder="Search for a question or topic..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {Object.keys(groupedQuestions).length > 0 ? (
        Object.keys(groupedQuestions).map((category, index) => (
          <div key={index} className="faq-category">
            <h3>
              {categoryIcons[category] && (
                <FontAwesomeIcon 
                  icon={categoryIcons[category].icon} 
                  style={{ color: categoryIcons[category].color }} 
                />
              )} 
              {highlightText(category, searchQuery)}
            </h3>
            {groupedQuestions[category].map((faq, idx) => (
              <div className="faq" key={idx}>
                <h4>{highlightText(faq.question, searchQuery)}</h4>
                <p>{highlightText(faq.answer, searchQuery)}</p>
              </div>
            ))}
          </div>
        ))
      ) : (
        <div className="no-results">
          <FontAwesomeIcon icon={faExclamationCircle} size="3x" />
          <p>No results found</p>
        </div>
      )}
    </div>
  );
};

export default FAQs;


