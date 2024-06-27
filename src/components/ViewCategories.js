import React, { useState, useEffect } from 'react';
import api from '../helpers/api';
import { useUser } from './UserContext';
import '../styles/views/ViewCategories.scss';
import Popup from './Popup';

const ViewCategories = () => {
  const { user } = useUser();
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editCategory, setEditCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('categories/');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchInput = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteCategory = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await api.delete(`category/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(categories.filter(category => category.id !== id));
      setPopupMessage('Category deleted successfully.');
    } catch (error) {
      console.error('Error deleting category:', error);
      setPopupMessage('Failed to delete category. Please try again.');
    }
    setShowPopup(true);
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setNewCategoryName(category.name);
  };

  const handleUpdateCategory = async (id) => {
    try {
      const token = localStorage.getItem('access_token');
      await api.patch(`category/${id}/`, { name: newCategoryName }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCategories(categories.map(category =>
        category.id === id ? { ...category, name: newCategoryName } : category
      ));
      setEditCategory(null);
      setPopupMessage('Category updated successfully.');
    } catch (error) {
      console.error('Error updating category:', error);
      setPopupMessage('Failed to update category. Please try again.');
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return (
    <div className="view-categories">
      <h2>Categories</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category name..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
      </div>
      <div className="categories-container">
        {user.role === 'admin' ? (
          <table className="categories-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map(category => (
                <tr key={category.id}>
                  <td>
                    {editCategory && editCategory.id === category.id ? (
                      <input
                        type="text"
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                      />
                    ) : (
                      category.name
                    )}
                  </td>
                  <td>
                    {editCategory && editCategory.id === category.id ? (
                      <button onClick={() => handleUpdateCategory(category.id)}>Save</button>
                    ) : (
                      <>
                        <button onClick={() => handleEditCategory(category)}>Edit</button>
                        <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <ul>
            {filteredCategories.map(category => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        )}
      </div>
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default ViewCategories;