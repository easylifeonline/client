// ProductList.js

import React, { useEffect, useState } from 'react';
import api from '../helpers/api'; 
import { useUser } from './UserContext';
import '../styles/views/ProductList.scss';
import { FaBoxOpen, FaImage } from 'react-icons/fa';

const ProductList = () => {
  const { user } = useUser();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user && user.username) {
        try {
          const response = await api.get('products/');
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [user]);

  return (
    <div className="product-list-container">
      <h2>My Products</h2>
      {user ? (
        <div className="products">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                {product.image ? (
                  <img src={product.image} alt={product.title} className="product-image" />
                ) : (
                  <div className="product-image-placeholder">
                    <FaImage className="image-icon" />
                  </div>
                )}
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <p>{product.description}</p>
                  <p>Price: ${product.price}</p>
                  <p>SKU: {product.sku}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="no-products">
              <FaBoxOpen className="no-products-icon" />
              <p>No products found</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductList;
