import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import '../styles/views/AdminVendorPolicies.scss';
import { useUser } from './UserContext';
import Popup from './Popup';

const AdminVendorPolicies = () => {
  const { user } = useUser();
  const [policy, setPolicy] = useState({ title: '', description: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [popupTitle, setPopupTitle] = useState('');

  useEffect(() => {
    fetchPolicy();
  }, []);

  const fetchPolicy = async () => {
    try {
      const response = await api.get('vendor-policies-guidelines/1/');
      setPolicy(response.data);
    } catch (error) {
      console.error('Error fetching policy:', error);
    }
  };

  const handleEdit = () => {
    setPopupTitle('Edit Policy');
    setShowPopup(true);
  };

  const handleSave = async () => {
    try {
      await api.put(`vendor-policies-guidelines/1/`, policy);
      setShowPopup(false);
      fetchPolicy();
    } catch (error) {
      console.error('Error saving policy:', error);
    }
  };

  return (
    <div className="admin-vendor-policies">
      <h2>Vendor Policies and Guidelines</h2>
      <div className="policy-content">
        <h3>{policy.title}</h3>
        <p>{policy.description}</p>
      </div>
      {user && user.role === 'admin' && (
        <button onClick={handleEdit} className="edit-button">Edit Policy</button>
      )}

      {showPopup && (
        <Popup onClose={() => setShowPopup(false)}>
          <h2>{popupTitle}</h2>
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <label>
              Title:
              <input
                type="text"
                value={policy.title}
                onChange={(e) => setPolicy({ ...policy, title: e.target.value })}
              />
            </label>
            <label>
              Description:
              <textarea
                value={policy.description}
                onChange={(e) => setPolicy({ ...policy, description: e.target.value })}
              />
            </label>
            <button type="submit">Save</button>
          </form>
        </Popup>
      )}
    </div>
  );
};

export default AdminVendorPolicies;
