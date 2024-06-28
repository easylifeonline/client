import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../helpers/api';
import '../styles/views/OrderSummary.scss';

const OrderSummary = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await api.get(`orders/${orderId}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        });
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-summary-container">
      <h2>Order Summary</h2>
      <div className="order-details">
        <p><strong>Order ID:</strong> {order.id}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Billing Address:</strong> {order.billing_address}</p>
        <p><strong>Shipping Address:</strong> {order.shipping_address}</p>
        <p><strong>Payment Method:</strong> {order.payment_method}</p>
        <p><strong>Total:</strong> ${order.total}</p>
      </div>
      <div className="order-items">
        <h3>Items</h3>
        <ul>
          {order.items.map((item) => (
            <li key={item.id}>
              {item.product.title} x {item.quantity} - ${item.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderSummary;