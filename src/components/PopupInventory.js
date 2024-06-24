// PopupInventory.js

import React, { useState } from 'react';
import api from '../helpers/api';
import { useUser } from './UserContext';
import '../styles/views/PopupInventory.scss';

const PopupInventory = ({ product, initialQuantity, onClose, onUpdate }) => {
  const { user } = useUser();
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdateInventory = async () => {
    if (!user || user.role !== 'vendor') {
      setError('Unauthorized action. Only vendors can update inventory.');
      return;
    }

    if (quantity <= 0) {
      setError('Quantity must be greater than 0.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.put(`inventory/${product.id}/`, {
        quantity: parseInt(quantity)
      });

      onUpdate(); // Callback to refresh the inventory list
      onClose();  // Close the popup
    } catch (error) {
      console.error("Error updating inventory:", error);
      setError("Failed to update inventory. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="popup-inventory-overlay">
      <div className="popup-inventory-container">
        <h3>Update Inventory for {product.product_name}</h3>
        <div className="popup-form-group">
          <label htmlFor="productName">Product Name</label>
          <input type="text" id="productName" value={product.product_name} readOnly />
        </div>
        <div className="popup-form-group">
          <label htmlFor="newQuantity">New Quantity</label>
          <input
            type="number"
            id="newQuantity"
            value={quantity}
            onChange={handleQuantityChange}
            min="1"
          />
        </div>
        {error && <p className="popup-error">{error}</p>}
        <div className="popup-buttons">
          <button onClick={onClose} disabled={loading}>Cancel</button>
          <button onClick={handleUpdateInventory} disabled={loading}>
            {loading ? 'Updating...' : 'OK'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupInventory;