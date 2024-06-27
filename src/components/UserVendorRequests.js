import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import { useUser } from './UserContext';
import '../styles/views/UserVendorRequests.scss';
import Popup from './Popup';

const UserVendorRequests = () => {
  const { user } = useUser();
  const [vendorRequests, setVendorRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    if (user) {
      const fetchUserVendorRequests = async () => {
        try {
          const token = localStorage.getItem('access_token');
          const response = await api.get(`vendor-requests/?email=${user.email}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          const activeRequests = response.data.filter(request => request.activity === 'actif');
          setVendorRequests(activeRequests);
        } catch (error) {
          console.error('Error fetching vendor requests:', error);
          setErrorMessage('Failed to load vendor requests.');
        }
      };

      fetchUserVendorRequests();
    }
  }, [user]);

  const handleDeleteRequest = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await api.patch(`vendor-requests/${id}/`, { activity: 'inactif' }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVendorRequests(prevRequests =>
        prevRequests.filter(request => request.id !== id)
      );
    } catch (error) {
      console.error('Error deleting request:', error);
      setPopupMessage('Failed to delete the request. Please try again.');
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  if (!user) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return (
    <div className="user-vendor-requests">
      <h2>My Vendor Requests</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="requests-container">
        {vendorRequests.length > 0 ? (
          vendorRequests.map(request => (
            <div key={request.id} className="request-card">
              <div className="request-header">
                <h3>{request.business_name}</h3>
                <span className="status-badge">{request.status}</span>
                {(request.status === 'pending' || request.status === 'under_review') && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    Delete
                  </button>
                )}
              </div>
              <div className="request-body">
                <p><strong>Contact Person:</strong> {request.contact_person}</p>
                <p><strong>Email:</strong> {request.email}</p>
                <p><strong>Phone:</strong> {request.phone}</p>
                <p><strong>Product Types:</strong> {request.product_types}</p>
                <p><strong>Address:</strong> {request.address}</p>
                <p><strong>City:</strong> {request.city}</p>
                <p><strong>State:</strong> {request.state}</p>
                <p><strong>Zip Code:</strong> {request.zip_code}</p>
                <p><strong>Country:</strong> {request.country}</p>
                <p><strong>Description:</strong> {request.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No vendor requests found</p>
        )}
      </div>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default UserVendorRequests;