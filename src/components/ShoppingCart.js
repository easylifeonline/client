import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import { useUser } from './UserContext';
import '../styles/views/ShoppingCart.scss';
import { importedImages } from '../helpers/importImages';

const ShoppingCart = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const getPathFromUrl = (url) => {
    const parsedUrl = new URL(url);
    return parsedUrl.pathname.split('/').pop();
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (user) {
        try {
          const response = await api.get('cart/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          setCartItems(response.data.items);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
        setCartItems(localCart.items);
      }
    };

    fetchCartItems();
  }, [user]);

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (user) {
      try {
        await api.patch(`cart/items/${itemId}/`, { quantity }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          )
        );
      } catch (error) {
        console.error('Error updating quantity:', error);
      }
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      const itemIndex = localCart.items.findIndex(item => item.id === itemId);

      if (itemIndex > -1) {
        localCart.items[itemIndex].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(localCart));
        setCartItems(localCart.items);
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
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
      } catch (error) {
        console.error('Error removing item:', error);
      }
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      localCart.items = localCart.items.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(localCart));
      setCartItems(localCart.items);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="shopping-cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.product.image} alt={item.product.title} className="cart-item-image" />
              {/* {console.log("item.product.image: ", item.product.image)}
                {console.log("importedImages===================: ", item)} */}
              {/* <img src={importedImages[getPathFromUrl(item.product.image)]} alt={item.product.image} className="cart-item-image" /> */}
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
          ))}
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
