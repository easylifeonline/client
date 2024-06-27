import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import { useUser } from './UserContext';
import PopupDeleteUser from './PopupDeleteUser';
import { FaTrash, FaSearch, FaFilter } from 'react-icons/fa';
import '../styles/views/AdminDashboard.scss';

const AdminDashboard = () => {
  const { user } = useUser();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPopupDeleteUser, setShowPopupDeleteUser] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [vendorRequests, setVendorRequests] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (user && user.role === 'admin') {
      const fetchUsers = async () => {
        try {
          const response = await api.get('users/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          setUsers(response.data);
          setFilteredUsers(response.data);
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

      fetchUsers();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.role === 'admin') {
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

  const handleRoleChange = async (userId, role) => {
    try {
      await api.put(`users/${userId}/change_role/`, { role }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      setUsers(users.map(user => user.id === userId ? { ...user, role } : user));
      setFilteredUsers(filteredUsers.map(user => user.id === userId ? { ...user, role } : user));
      alert('Role updated successfully');
    } catch (error) {
      console.error('Error updating role:', error);
      alert('Role update failed');
    }
  };

  const handleDeleteClick = (userData) => {
    setSelectedUser(userData);
    setShowPopupDeleteUser(true);
  };

  const handleCancelDelete = () => {
    setSelectedUser(null);
    setShowPopupDeleteUser(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await api.delete(`users/${selectedUser.id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });
      alert('User deleted successfully');
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setFilteredUsers(filteredUsers.filter(user => user.id !== selectedUser.id));
      setShowPopupDeleteUser(false);
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user');
      setShowPopupDeleteUser(false);
    }
  };

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
    filterUsers(e.target.value, selectedRole);
  };

  const handleRoleFilter = (role) => {
    setSelectedRole(role);
    filterUsers(searchQuery, role);
  };

  const filterUsers = (query, role) => {
    let filtered = users;
    if (query) {
      filtered = filtered.filter(user =>
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
      );
    }
    if (role) {
      filtered = filtered.filter(user => user.role === role);
    }
    setFilteredUsers(filtered);
  };

  if (!user || user.role !== 'admin') {
    return <p>You do not have permission to view this page.</p>;
  }

  return (
    <div className="admin-dashboard">
      <h2>User Management</h2>
      
      <div className="search-filter-bar">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by username or email..."
            value={searchQuery}
            onChange={handleSearchInput}
          />
          <button onClick={() => filterUsers(searchQuery, selectedRole)}>
            <FaSearch />
          </button>
        </div>
        <div className="role-filter">
          <button onClick={() => handleRoleFilter('')} className={selectedRole === '' ? 'active' : ''}>
            <FaFilter /> All
          </button>
          <button onClick={() => handleRoleFilter('admin')} className={selectedRole === 'admin' ? 'active' : ''}>
            <FaFilter /> Admin
          </button>
          <button onClick={() => handleRoleFilter('vendor')} className={selectedRole === 'vendor' ? 'active' : ''}>
            <FaFilter /> Vendor
          </button>
          <button onClick={() => handleRoleFilter('customer')} className={selectedRole === 'customer' ? 'active' : ''}>
            <FaFilter /> Customer
          </button>
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((userData) => (
              <tr key={userData.id} className={userData.id === user.id ? 'current-user' : ''}>
                <td>{userData.username}</td>
                <td>{userData.email}</td>
                <td>{userData.role}</td>
                <td>
                  <select
                    value={userData.role}
                    onChange={(e) => handleRoleChange(userData.id, e.target.value)}
                  >
                    <option value="admin">Admin</option>
                    <option value="vendor">Vendor</option>
                    <option value="customer">Customer</option>
                  </select>
                  {userData.role === 'customer' && (
                    <button className="delete-button" onClick={() => handleDeleteClick(userData)}>
                      <FaTrash />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-users">
                <div className="no-users-icon">
                  <FaTrash />
                </div>
                <p>No users found</p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {showPopupDeleteUser && selectedUser && (
        <PopupDeleteUser
          message={`Are you sure you want to remove ${selectedUser.username}? This action will permanently delete the user.`}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default AdminDashboard;