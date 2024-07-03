import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/ProductList.scss';
import { FaBoxOpen, FaImage, FaArrowRight, FaArrowLeft } from 'react-icons/fa';

const ProductListAll = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('products-all/');
        const productsWithIndexes = response.data.map(product => ({
          ...product,
          currentImageIndex: 0,
        }));
        setProducts(productsWithIndexes);
      } catch (error) {
        console.error("Error fetching all products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleNextImage = (index, e) => {
    e.stopPropagation();
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      const product = newProducts[index];
      const currentImageIndex = product.currentImageIndex || 0;
      if (currentImageIndex < product.images.length - 1) {
        product.currentImageIndex = currentImageIndex + 1;
      }
      return newProducts;
    });
  };

  const handlePrevImage = (index, e) => {
    e.stopPropagation();
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      const product = newProducts[index];
      const currentImageIndex = product.currentImageIndex || 0;
      if (currentImageIndex > 0) {
        product.currentImageIndex = currentImageIndex - 1;
      }
      return newProducts;
    });
  };

  return (
    <div className="product-list-container">
      <h2>All Products</h2>
      <div className="products">
        {products.length > 0 ? (
          products.map((product, index) => (
            <div
              key={product.id}
              className="product-item"
            >
              <div className="product-image-container">
                {product.images && product.images.length > 0 ? (
                  <>
                    <img
                      src={product.images[product.currentImageIndex || 0].image}
                      alt={product.title}
                      className="product-image"
                    />
                    <div className="arrows-container">
                      {product.currentImageIndex > 0 && (
                        <FaArrowLeft
                          className="arrow left-arrow"
                          onClick={(e) => handlePrevImage(index, e)}
                        />
                      )}
                      {product.currentImageIndex < product.images.length - 1 && (
                        <FaArrowRight
                          className="arrow right-arrow"
                          onClick={(e) => handleNextImage(index, e)}
                        />
                      )}
                    </div>
                  </>
                ) : (
                  <div className="product-image-placeholder">
                    <FaImage className="image-icon" />
                  </div>
                )}
              </div>
              <div className="product-details">
                <h3>{product.title}</h3>
                <p>
                  {product.description.length > 3 ? (
                    <>
                      {product.description.substring(0, 100)}...
                      <button
                        className="read-more"
                        onClick={() => navigate(`/products/${product.id}`)}
                      >
                        Read More
                      </button>
                    </>
                  ) : (
                    product.description
                  )}
                </p>
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

