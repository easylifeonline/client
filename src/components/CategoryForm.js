import React, { useState } from 'react';
import { useUser } from './UserContext';
import api from '../helpers/api';
import '../styles/views/CategoryForm.scss';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';


const CategoryForm = () => {
  const { user } = useUser();
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.role === 'admin') {
      setMessage('You do not have permission to perform this action.');
      setShowPopup(true);
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      await api.post('category/', { name: categoryName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setMessage('Category created successfully.');
      setCategoryName('');
      navigate('/view-categories');
    } catch (error) {
      console.error('Error creating category:', error);
      setMessage('Failed to create category. Please try again.');
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="category-form-container">
      <h2>Create New Category</h2>
      <form onSubmit={handleSubmit} className="category-form">
        <div className="form-group">
          <label htmlFor="categoryName">Category Name</label>
          <input
            type="text"
            id="categoryName"
            name="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            required
          />
        </div>
        <button type="submit" className="submit-button">Create</button>
      </form>
      {showPopup && <Popup message={message} onClose={closePopup} />}
    </div>
  );
};

export default CategoryForm;
