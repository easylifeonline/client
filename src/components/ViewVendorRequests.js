import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import { useUser } from './UserContext';
import '../styles/views/ViewVendorRequests.scss';
import Popup from './Popup';

const ViewVendorRequests = () => {
  const { user } = useUser();
  const [vendorRequests, setVendorRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    if (user) {
      const fetchVendorRequests = async () => {
        try {
          const token = localStorage.getItem('access_token');
          const response = await api.get('vendor-requests/', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setVendorRequests(response.data);
        } catch (error) {
          console.error('Error fetching vendor requests:', error);
          setErrorMessage('Failed to load vendor requests.');
        }
      };

      fetchVendorRequests();
    }
  }, [user]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('access_token');
      await api.patch(`vendor-requests/${id}/`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setVendorRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id ? { ...request, status: newStatus } : request
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
      setErrorMessage('Failed to update request status.');
    }
  };

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

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredRequests = vendorRequests.filter(request => {
    const matchesEmail = request.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    return matchesEmail && matchesStatus;
  });

  if (!user) {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="view-vendor-requests">
      <h2>Vendor Requests</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
        <select value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="under_review">Under Review</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div className="requests-container">
        {filteredRequests.length > 0 ? (
          filteredRequests.map(request => (
            <div key={request.id} className={`request-card ${request.status === 'rejected' ? 'rejected' : ''}`}>
              <div className="request-header">
                <h3>{request.business_name}</h3>
                {request.activity === 'actif' ? (
                  <>
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="under_review">Under Review</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    {(request.status === 'pending' || request.status === 'under_review') && (
                      <button
                        className="delete-button"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        Delete
                      </button>
                    )}
                  </>
                ) : (
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="under_review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
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

export default ViewVendorRequests;