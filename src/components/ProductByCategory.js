import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/ProductList.scss';
import { FaBoxOpen, FaImage } from 'react-icons/fa';
import trackClickedProduct from "../components/websiteData/TrackClickedProduct";
import { importedImages } from '../helpers/importImages';

const ProductByCategory = ({ category }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getPathFromUrl = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname.split('/').pop();
  };

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await api.get('products/', {
          params: { category: category }
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    if (category) {
      fetchProductsByCategory();
    }
  }, [category]);

  const handleProductClick = (productId) => {
    trackClickedProduct(productId);
    navigate(`/products/${productId}`);
  };

  return (
    <div className="product-list-container">
      <h2>Products in {category}</h2>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="product-item"
              onClick={() => handleProductClick(product.id)}
            >
              {product.image ? (
                <React.Fragment>
                  <img src={importedImages[getPathFromUrl(product.image)]} alt={product.title} className="product-image" />
                </React.Fragment>
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

export default ProductByCategory;