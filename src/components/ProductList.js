import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api'; 
import { useUser } from './UserContext';
import '../styles/views/ProductList.scss';
import { FaBoxOpen, FaImage } from 'react-icons/fa';
import PopupDeleteUser from './PopupDeleteUser';

const ProductList = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user && user.username) {
        try {
          const response = await api.get('products/', {
            params: { vendor: user.username },
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      }
    };

    fetchProducts();
  }, [user]);

  const handleUpdate = (productId) => {
    navigate(`/update-product/${productId}`);
  };

  const handleDelete = async (productId) => {
    try {
      const token = localStorage.getItem('access_token');
      await api.delete(`products/${productId}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
      setShowPopup(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const confirmDelete = (productId) => {
    setDeleteProductId(productId);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setDeleteProductId(null);
  };

  return (
    <div className="product-list-container">
      <h2>My Products</h2>
      {user ? (
        <div className="products">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-item">
                {product.image ? (
                  <React.Fragment>
                    <img src={product.image} alt={product.title} className="product-image" />
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
                <div className="product-actions">
                  <button onClick={() => handleUpdate(product.id)} className="update-button">Update</button>
                  <button onClick={() => confirmDelete(product.id)} className="delete-button">Delete</button>
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
      {showPopup && (
        <PopupDeleteUser 
          message="Are you sure you want to delete this product?" 
          onCancel={closePopup} 
          onConfirm={() => handleDelete(deleteProductId)}
        />
      )}
    </div>
  );
};

export default ProductList;
