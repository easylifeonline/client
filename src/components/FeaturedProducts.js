import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import '../styles/views/FeaturedProducts.scss';
import QuickViewModal from './QuickViewModal';

const FeaturedProducts = ({ title, type }) => {
  const [products, setProducts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const token = localStorage.getItem('access_token');

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
            <ProductItem
              key={product.id}
              product={product}
              onQuickView={handleQuickView}
            />
          ))}
        </div>
      ) : (
        <div className="no-products">
          <img src="/images/coming.png" alt="Coming Soon" />
          {/* <p>No products available at the moment. Check back later!</p> */}
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

const ProductItem = ({ product, onQuickView }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="product-item">
      <div className="image-container">
        {product.images.length > 1 && (
          <button
            className="prev-button"
            onClick={handlePrevImage}
            disabled={currentImageIndex === 0}
          >
            &lt;
          </button>
        )}
        <img src={product.images[currentImageIndex]?.image} alt={product.title} />
        {product.images.length > 1 && (
          <button
            className="next-button"
            onClick={handleNextImage}
            disabled={currentImageIndex === product.images.length - 1}
          >
            &gt;
          </button>
        )}
      </div>
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button onClick={() => onQuickView(product)}>Quick View</button>
    </div>
  );
};

export default FeaturedProducts;