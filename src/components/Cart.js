import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import { useNavigate } from 'react-router-dom';
import '../styles/views/Cart.scss';
import { useUser } from './UserContext';

const Cart = () => {
  const [cart, setCart] = useState({ items: [] });
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    const fetchCart = async () => {
      if (user) {
        try {
          const response = await api.get('cart/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          setCart(response.data);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      } else {
        const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
        setCart(localCart);
      }
    };

    fetchCart();
  }, [user]);

  const handleUpdateQuantity = (productId, quantity) => {
    if (user) {
      // Update cart quantity via API
    } else {
      let localCart = { ...cart };
      const itemIndex = localCart.items.findIndex(item => item.product.id === productId);
      if (itemIndex > -1) {
        localCart.items[itemIndex].quantity = quantity;
        if (quantity === 0) {
          localCart.items.splice(itemIndex, 1);
        }
        setCart(localCart);
        localStorage.setItem('cart', JSON.stringify(localCart));
      }
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.items.length > 0 ? (
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.product.id} className="cart-item">
              <div className="item-info">
                <p>{item.product.title}</p>
                <p>Price: ${item.product.price}</p>
                <div className="item-quantity">
                  <label htmlFor={`quantity-${item.product.id}`}>Quantity:</label>
                  <input
                    type="number"
                    id={`quantity-${item.product.id}`}
                    value={item.quantity}
                    min="0"
                    onChange={(e) => handleUpdateQuantity(item.product.id, parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleCheckout} className="checkout-button">Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;