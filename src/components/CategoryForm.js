import React, { useState } from 'react';
import { useUser } from './UserContext';
import api from '../helpers/api';
import '../styles/views/CategoryForm.scss';
import Popup from './Popup';
import { useNavigate } from 'react-router-dom';

const CategoryForm = () => {
  const { user } = useUser();
  const [categoryName, setCategoryName] = useState('');
  const [subcategories, setSubcategories] = useState(['']);
  const [message, setMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubcategoryChange = (index, value) => {
    const newSubcategories = [...subcategories];
    newSubcategories[index] = value;
    setSubcategories(newSubcategories);
  };

  const addSubcategoryField = () => {
    setSubcategories([...subcategories, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.role === 'admin') {
      setMessage('You do not have permission to perform this action.');
      setShowPopup(true);
      return;
    }
    try {
      const token = localStorage.getItem('access_token');
      const response = await api.post('category/', { name: categoryName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const categoryId = response.data.id;

      for (const subcategory of subcategories) {
        if (subcategory.trim()) {
          await api.post('category/', { name: subcategory, parent: categoryId }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      }

      setMessage('Category and subcategories created successfully.');
      setCategoryName('');
      setSubcategories(['']);
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
        {subcategories.map((subcategory, index) => (
          <div key={index} className="form-group">
            <label htmlFor={`subcategory-${index}`}>Subcategory {index + 1}</label>
            <input
              type="text"
              id={`subcategory-${index}`}
              name={`subcategory-${index}`}
              value={subcategory}
              onChange={(e) => handleSubcategoryChange(index, e.target.value)}
              placeholder="Enter subcategory name"
              required
            />
          </div>
        ))}
        <button type="button" className="add-subcategory-button" onClick={addSubcategoryField}>
          + Add Subcategory
        </button>
        <button type="submit" className="submit-button">Create</button>
      </form>
      {showPopup && <Popup message={message} onClose={closePopup} />}
    </div>
  );
};

export default CategoryForm;
