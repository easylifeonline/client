import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/ProductByCategory.scss';
import { FaBoxOpen, FaImage, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import trackClickedProduct from "../components/websiteData/TrackClickedProduct";

const ProductByCategory = ({ category }) => {
  const [products, setProducts] = useState([]);
  const [imageIndexes, setImageIndexes] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await api.get('products/', {
          params: { category: category }
        });
        setProducts(response.data);
        const initialIndexes = {};
        response.data.forEach(product => {
          initialIndexes[product.id] = 0;
        });
        setImageIndexes(initialIndexes);
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

  const handleNextImage = (productId) => {
    setImageIndexes(prevIndexes => ({
      ...prevIndexes,
      [productId]: prevIndexes[productId] + 1
    }));
  };

  const handlePrevImage = (productId) => {
    setImageIndexes(prevIndexes => ({
      ...prevIndexes,
      [productId]: prevIndexes[productId] - 1
    }));
  };

  return (
    <div className="product-list-container">
      <h2>Products in {category}</h2>
      <div className="products">
        {products.length > 0 ? (
          products.map((product) => {
            const currentIndex = imageIndexes[product.id] || 0;
            const currentImage = product.images[currentIndex];

            return (
              <div
                key={product.id}
                className="product-item"
                onClick={() => handleProductClick(product.id)}
              >
                {currentImage ? (
                  <React.Fragment>
                    <img src={currentImage.image} alt={product.title} className="product-image" />
                    <div className="image-navigation">
                      {currentIndex > 0 && (
                        <FaArrowLeft
                          className="arrow-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage(product.id);
                          }}
                        />
                      )}
                      {currentIndex < product.images.length - 1 && (
                        <FaArrowRight
                          className="arrow-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage(product.id);
                          }}
                        />
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <div className="product-image-placeholder">
                    <FaImage className="image-icon" />
                  </div>
                )}
                <div className="product-details">
                  <h3>{product.title}</h3>
                  <p>{product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}</p>
                  {product.description.length > 100 && (
                    <button
                      className="read-more-button"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${product.id}`);
                      }}
                    >
                      Read More
                    </button>
                  )}
                  <p>Price: ${product.price}</p>
                  <p>SKU: {product.sku}</p>
                </div>
              </div>
            );
          })
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