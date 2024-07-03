import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import { useUser } from './UserContext';
import '../styles/views/ShoppingCart.scss';
import { useCart } from '../contexts/CartContext';
import { FaImage, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ShoppingCart = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { cartItems, fetchCartSummary } = useCart();
  const [imageIndexes, setImageIndexes] = useState({});

  useEffect(() => {
    fetchCartSummary();
    const initialIndexes = {};
    cartItems.forEach(item => {
      initialIndexes[item.id] = 0;
    });
    setImageIndexes(initialIndexes);
  }, [fetchCartSummary, cartItems]);

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (user) {
      try {
        await api.patch(`cart/items/${itemId}/`, { quantity }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        fetchCartSummary();
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      const itemIndex = localCart.items.findIndex(item => item.id === itemId);

      if (itemIndex > -1) {
        localCart.items[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(localCart));
        fetchCartSummary();
      }
    }
  };

  const handleRemoveItem = async (itemId) => {
    if (user) {
      try {
        await api.delete(`cart/items/${itemId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        fetchCartSummary();
      } catch (error) {
        console.error('Error removing item:', error);
      }
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      localCart.items = localCart.items.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(localCart));
      fetchCartSummary();
    }
  };

  const handleNextImage = (itemId, imagesLength) => {
    setImageIndexes(prevIndexes => ({
      ...prevIndexes,
      [itemId]: prevIndexes[itemId] + 1 < imagesLength ? prevIndexes[itemId] + 1 : prevIndexes[itemId]
    }));
  };

  const handlePrevImage = (itemId) => {
    setImageIndexes(prevIndexes => ({
      ...prevIndexes,
      [itemId]: prevIndexes[itemId] > 0 ? prevIndexes[itemId] - 1 : 0
    }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => {
            const currentIndex = imageIndexes[item.id] || 0;
            const currentImage = item.product.images ? item.product.images[currentIndex] : null;

            return (
              <div key={item.id} className="cart-item">
                {currentImage ? (
                  <React.Fragment>
                    <img
                      src={currentImage.image}
                      alt={item.product.title}
                      className="cart-item-image"
                    />
                    <div className="image-navigation">
                      {currentIndex > 0 && (
                        <FaArrowLeft
                          className="arrow-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePrevImage(item.id);
                          }}
                        />
                      )}
                      {currentIndex < item.product.images.length - 1 && (
                        <FaArrowRight
                          className="arrow-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNextImage(item.id, item.product.images.length);
                          }}
                        />
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <FaImage className="cart-item-image-placeholder" />
                )}
                <div className="cart-item-details">
                  <h3>{item.product.title}</h3>
                  <p>Price: ${item.product.price}</p>
                  <div className="cart-item-quantity">
                    <label htmlFor={`quantity-${item.id}`}>Quantity:</label>
                    <input
                      type="number"
                      id={`quantity-${item.id}`}
                      value={item.quantity}
                      min="1"
                      onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <button onClick={() => handleRemoveItem(item.id)} className="remove-item-button">
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
        </div>
      ) : (
        <p>No items in cart</p>
      )}
    </div>
  );
};

export default ShoppingCart;
