import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/views/ProductList.scss';
import { FaBoxOpen, FaImage } from 'react-icons/fa';

const ProductListAll = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/products-all/');
        setProducts(response.data);
        console.log('Fetched all products:', response.data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-list-container">
      <h2>All Products</h2>
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
    </div>
  );
};

export default ProductListAll;