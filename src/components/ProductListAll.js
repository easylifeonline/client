import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/ProductList.scss';
import { FaBoxOpen, FaImage } from 'react-icons/fa';
import trackClickedProduct from "../components/websiteData/TrackClickedProduct";

const ProductListAll = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products-all/');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (productId) => {
    trackClickedProduct(productId);
    navigate(`/products/${productId}`);
  };

  return (
    <div className="product-list-container">
      <h2>All Products</h2>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
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