import React, { useState } from 'react';
import '../styles/views/QuickViewModal.scss';
import { useUser } from './UserContext';
import { useCart } from '../contexts/CartContext';
import api from '../helpers/api';

const QuickViewModal = ({ product, onClose }) => {
  const { user } = useUser();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleAddToCart = async () => {
    if (user) {
      try {
        await api.post(
          'cart/items/',
          { product_id: product.id, quantity },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`,
            }
          }
        );
        alert('Product added to cart');
        addToCart(product, quantity); // Update cart context
        onClose(); 
      } catch (error) {
        console.error('Error adding product to cart:', error);
      }
    } else {
      let localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
      const itemIndex = localCart.items.findIndex((item) => item.product.id === product.id);

      if (itemIndex > -1) {
        localCart.items[itemIndex].quantity += quantity;
      } else {
        localCart.items.push({
          product: {
            id: product.id,
            title: product.title,
            image: product.images[currentImageIndex]?.image,
            price: product.price
          },
          quantity: quantity,
        });
      }

      localStorage.setItem('cart', JSON.stringify(localCart));
      alert('Product added to cart');
      addToCart(product, quantity); // Update cart context
      onClose();
    }
  };

  const handleNextImage = () => {
    if (currentImageIndex < product.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  return (
    <div className="quick-view-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="image-container">
          {product.images.length > 1 && (
            <button
              className="prev-button"
              onClick={handlePrevImage}
              disabled={currentImageIndex === 0}
            >
              &lt;
            </button>
          )}
          <img src={product.images[currentImageIndex]?.image} alt={product.title} />
          {product.images.length > 1 && (
            <button
              className="next-button"
              onClick={handleNextImage}
              disabled={currentImageIndex === product.images.length - 1}
            >
              &gt;
            </button>
          )}
        </div>
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <div className="quantity-container">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
          />
        </div>
        <div className="button-container">
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;