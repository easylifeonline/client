import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import '../styles/views/FeaturedProducts.scss';
import QuickViewModal from './QuickViewModal';
import { importedImages } from '../helpers/importImages';

const FeaturedProducts = ({ title, type }) => {
  const [products, setProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const token = localStorage.getItem('access_token');

  const getPathFromUrl = (inputImg) => {
    if (inputImg === null) {
      return null;
    }
  
    try {
      const parsedUrl = new URL(inputImg);
      return parsedUrl.pathname.split('/').pop();
    } catch (e) {
      return inputImg.split('/').pop();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products/featured/', {
          params: { type: type },
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        if (error.response && error.response.status === 401) {
          alert('You are not authorized to view these products. Please log in.');
        } else {
          alert('An error occurred while fetching products. Please try again later.');
        }
      }
    };

    fetchProducts();
  }, [type, token]);

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
  };

  return (
    <section className="featured-products">
      <h2>{title}</h2>
      {products.length > 0 ? (
        <div className="products-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img src={importedImages[getPathFromUrl(product.image)]} alt={product.title} />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button onClick={() => handleQuickView(product)}>Quick View</button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-products">
          <img src="/images/coming.png" alt="Coming Soon" />
          <p>No products available at the moment. Check back later!</p>
        </div>
      )}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </section>
  );
};

export default FeaturedProducts;