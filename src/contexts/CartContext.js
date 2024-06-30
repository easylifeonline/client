import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api from '../helpers/api';
import { useUser } from '../components/UserContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cartItems, setCartItems] = useState([]);

  const fetchCartSummary = useCallback(async () => {
    if (user) {
      try {
        const response = await api.get('cart/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setCartItems(response.data.items || []); // Ensure cartItems is always an array
      } catch (error) {
        console.error('Error fetching cart summary:', error);
      }
    } else {
      const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      setCartItems(localCart.items || []); // Ensure cartItems is always an array
    }
  }, [user]);

  const addToCart = (product, quantity) => {
    if (user) {
      api.post('cart/items/', { product_id: product.id, quantity }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      }).then(fetchCartSummary).catch(error => {
        console.error('Error adding product to cart:', error);
      });
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      const itemIndex = localCart.items.findIndex(item => item.product.id === product.id);

      if (itemIndex > -1) {
        localCart.items[itemIndex].quantity += quantity;
      } else {
        localCart.items.push({
          product: {
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price
          },
          quantity: quantity
        });
      }

      localStorage.setItem('cart', JSON.stringify(localCart));
      fetchCartSummary();
    }
  };

  useEffect(() => {
    fetchCartSummary();
  }, [fetchCartSummary]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, fetchCartSummary }}>
      {children}
    </CartContext.Provider>
  );
};