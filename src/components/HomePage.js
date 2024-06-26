import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import '../styles/views/HomePage.scss';
import Popup from './Popup'; 
import ProductListAll from './ProductListAll';
import { FaSearch } from 'react-icons/fa';
import TrackSearchQuery from  './websiteData/TrackSearchQuery';
import { elasticsearchApi } from '../helpers/api';

const Homepage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [errorMessage, setErrorMessage] = useState(''); 
    const [showPopup, setShowPopup] = useState(false);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const productResponse = await api.get('products/');
          setProducts(productResponse.data);
        } catch (error) {
          console.error('Error fetching products:', error);
          setErrorMessage('Failed to load products. Please try again later.');
          setShowPopup(true);
        }
      };
  
      fetchData();
    }, []);
  
    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const response = await api.get('categories/');
          setCategories(response.data);
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
  
      fetchCategories();
    }, []);
  
    const handleSearchInput = (e) => {
      setSearchQuery(e.target.value);
    };
  
    const handleSearch = async (e) => {
        e.preventDefault();
        TrackSearchQuery(searchQuery);
        try {
          const response = await elasticsearchApi.get('products/_search', {
            params: { q: searchQuery }
          });
          let filteredProducts = response.data.hits.hits.map(hit => hit._source);
          if (selectedCategory) {
            filteredProducts = filteredProducts.filter(product => product.category && product.category.name === selectedCategory);
          }
          setProducts(filteredProducts);
        } catch (error) {
          console.error('Error searching products:', error);
          setErrorMessage('Failed to search products. Please try again later.');
          setShowPopup(true);
        }
      };
      
  
    const handleCategoryChange = (category) => {
      setSelectedCategory(category);
      filterProducts(searchQuery, category);
    };
  
    const filterProducts = (query, category) => {
      let filtered = products;
      if (query) {
        filtered = filtered.filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      if (category) {
        filtered = filtered.filter(product => product.category && product.category.name === category);
      }
      setProducts(filtered);
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
          <form onSubmit={handleSearch}>
            <input 
              type="text" 
              placeholder="Search for products..." 
              value={searchQuery} 
              onChange={handleSearchInput} 
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
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
  
        <ProductListAll products={products} />
  
        {showPopup && (
          <Popup message={errorMessage} onClose={closePopup} />
        )}
      </div>
    );
  };
  
  export default Homepage;