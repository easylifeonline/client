// InventoryManagement.js

import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import { useUser } from './UserContext';
import PopupInventory from './PopupInventory';
import '../styles/views/InventoryManagement.scss';

const InventoryManagement = ({ productId }) => {
  const { user } = useUser();
  const [inventory, setInventory] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchInventory = async () => {
      if (user && user.role === 'vendor') {
        try {
          const response = await api.get(`inventory/?product=${productId}`);
          setInventory(response.data);
        } catch (error) {
          console.error("Error fetching inventory:", error);
        }
      }
    };

    fetchInventory();
  }, [user, productId]);

  const openPopup = (item) => {
    setSelectedProduct(item);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  const refreshInventory = async () => {
    if (user && user.role === 'vendor') {
      try {
        const response = await api.get(`inventory/?product=${productId}`);
        setInventory(response.data);
      } catch (error) {
        console.error("Error refreshing inventory:", error);
      }
    }
  };

  return (
    <div className="inventory-management-container">
      <h2>Inventory Management</h2>
      <table className="inventory-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name || 'Unnamed Product'}</td>
              <td>{item.quantity}</td>
              <td>
                <button onClick={() => openPopup(item)}>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedProduct && (
        <PopupInventory
          product={selectedProduct}
          initialQuantity={selectedProduct.quantity}
          onClose={closePopup}
          onUpdate={refreshInventory}
        />
      )}
    </div>
  );
};

export default InventoryManagement;
