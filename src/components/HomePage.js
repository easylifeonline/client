// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/views/HomePage.scss';
import Popup from './Popup'; 
import ProductListAll from './ProductListAll';

const Homepage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

  useEffect(() => {
    // Fetch initial data for products and categories
    const fetchData = async () => {
      try {
        const productResponse = await axios.get('http://localhost:8000/api/products');
        const categoryResponse = await axios.get('http://localhost:8000/api/categories');
        
        setProducts(productResponse.data);
        setCategories(categoryResponse.data);
        setFilteredProducts(productResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setErrorMessage('Failed to load data. Please try again later.');
        setShowPopup(true);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value, selectedCategory);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
  };

  const filterProducts = (query, category) => {
    let filtered = products;
    if (query) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }
    setFilteredProducts(filtered);
  };

  const closePopup = () => {
    setShowPopup(false);
    setErrorMessage('');
  };

  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to EasyLife Marketplace</h1>
        <p>Explore a wide range of products and find what you need!</p>
      </header>
      
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for products..." 
          value={searchQuery} 
          onChange={handleSearch} 
        />
      </div>

      <div className="category-filter">
        <select 
          value={selectedCategory} 
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

        <ProductListAll products={filteredProducts} />

      {showPopup && (
        <Popup message={errorMessage} onClose={closePopup} />
      )}
    </div>
  );
};

export default Homepage;
