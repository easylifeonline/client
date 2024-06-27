import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import '../styles/views/Home.scss';
import Popup from './Popup';
import api from '../helpers/api';
import ClickedProductsChart from './ClickedProductsChart';
import UserVendorRequests from './UserVendorRequests';

const Home = () => {
  const { user } = useUser();
  const [dashboardData, setDashboardData] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        const config = {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        };
        if (user.role === 'admin') {
          response = await api.get('admin/dashboard/', config);
        } else if (user.role === 'vendor') {
          response = await api.get('vendor/dashboard/', config);
        } else if (user.role === 'customer') {
          response = await api.get('customer/dashboard/', config);
        }
        setDashboardData(response.data);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        setErrorMessage("Failed to load dashboard data. " + (error.response?.data?.detail || error.message));
        setShowPopup(true);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const closePopup = () => {
    setShowPopup(false);
    setErrorMessage('');
  };

  return (
    <div className="home-container">
      {user && (
        <div className="welcome-message">
          <h2>Welcome, {user.first_name || user.username}!</h2>
        </div>
      )}

      {dashboardData && user.role === 'admin' && (
        <div className="admin-dashboard">
          <h3>Admin Dashboard</h3>
          <p>Total Users: {dashboardData.total_users}</p>
          <p>Total Products: {dashboardData.total_products}</p>
          <p>Total Orders: {dashboardData.total_orders}</p>
          {/* Add more admin-specific info and quick links */}
        </div>
      )}

      {dashboardData && user.role === 'vendor' && (
        <div className="vendor-dashboard">
          <h3>Vendor Dashboard</h3>
          <p>Total Sales: ${dashboardData.total_sales}</p>
          <p>Total Products: {dashboardData.total_products}</p>
          <p>Pending Orders: {dashboardData.pending_orders}</p>
          <h3>Most Visited Products</h3>
          <ClickedProductsChart />
          {/* Add more vendor-specific info and quick links */}
        </div>
      )}

      {dashboardData && user.role === 'customer' && (
        <div className="customer-dashboard">
          <h3>Your Orders</h3>
          <ul>
            {dashboardData.orders.map(order => (
              <li key={order.id}>Order #{order.id} - ${order.total}</li>
            ))}
          </ul>
          <UserVendorRequests />
        </div>
      )}

      {showPopup && (
        <Popup message={errorMessage} onClose={closePopup} />
      )}
    </div>
  );
};

export default Home;