import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import '../styles/views/OurServices.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../contexts/CartContext';

const OurServices = () => {
  const [categories, setCategories] = useState([]);
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems } = useCart();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('categories/');
        setCategories(response.data);
        groupCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const groupCategories = (categories) => {
    const grouped = categories.reduce((acc, category) => {
      if (category.parent === null) {
        acc.push({ ...category, subcategories: [] });
      } else {
        const parentIndex = acc.findIndex(cat => cat.id === category.parent);
        if (parentIndex !== -1) {
          acc[parentIndex].subcategories.push(category);
        }
      }
      return acc;
    }, []);
    setGroupedCategories(grouped);
  };

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length > 2) {
      try {
        const response = await api.get('search/', {
          params: { q: term },
        });
        setSuggestions(response.data);
        console.log('Search suggestions:', response.data);
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
  };

  return (
    <div className="our-services">
      <ul className="services-list">
        {groupedCategories.map((category) => (
          <li key={category.id} className="service-item">
            <a href={`/view-products/${category.name}`} className="service-link">
              {category.name}
            </a>
            {category.subcategories.length > 0 && (
              <ul className="subcategory-list">
                {category.subcategories.map((subcategory) => (
                  <li key={subcategory.id}>
                    <a href={`/view-products/${subcategory.name}`} className="subcategory-link">
                      {subcategory.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="search-section">
        <a href="/cart" className="cart-icon-container" title="Current items">
          <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
          {cartItems && cartItems.length > 0 && (
            <div className="cart-item-count">{cartItems.length}</div>
          )}
        </a>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search products..."
            className="search-input"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button className="search-button">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li key={suggestion.id} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default OurServices;


