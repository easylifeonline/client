import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import '../styles/views/OurServices.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';

const OurServices = () => {
  const [categories, setCategories] = useState([]);
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [openedCategory, setOpenedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('categories/');
        setCategories(response.data);
        groupCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
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

  const toggleCategory = (categoryId) => {
    setOpenedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
  };

  const handleSubcategoryClick = (subcategory) => {
    navigate(`/view-products/${subcategory.name}`);
    setOpenedCategory(null);
  };

  return (
    <div className="our-services">
      {loading ? (
        <div className="loader-container">
          <BeatLoader color="#14e028" />
          <p>Loading categories... (Currently using the Free Plan Service of Render, it might take up to 1min to connect.)</p>
        </div>
      ) : (
        <>
          <ul className="services-list">
            {groupedCategories.map((category) => (
              <li key={category.id} className="service-item">
                <span
                  className="service-link"
                  onClick={() => toggleCategory(category.id)}
                >
                  {category.name}
                </span>
                {openedCategory === category.id && category.subcategories.length > 0 && (
                  <ul className="subcategory-list">
                    {category.subcategories.map((subcategory) => (
                      <li key={subcategory.id}>
                        <span
                          className="subcategory-link"
                          onClick={() => handleSubcategoryClick(subcategory)}
                        >
                          {subcategory.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <div className="search-section">
            <span
              className="cart-icon-container"
              title="Current items"
              onClick={() => navigate('/cart')}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
              {cartItems && cartItems.length > 0 && (
                <div className="cart-item-count">{cartItems.length}</div>
              )}
            </span>
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
        </>
      )}
    </div>
  );
};

export default OurServices;