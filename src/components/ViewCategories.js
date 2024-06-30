import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../helpers/api';
import { useUser } from './UserContext';
import '../styles/views/ViewCategories.scss';
import Popup from './Popup';
import EditCategoryPopup from './EditCategoryPopup';

const highlightText = (text, query) => {
  if (!query) return text;
  const parts = text.split(new RegExp(`(${query})`, 'gi'));
  return parts.map((part, index) => 
    part.toLowerCase() === query.toLowerCase() ? <span key={index} className="highlight">{part}</span> : part
  );
};

const ViewCategories = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [groupedCategories, setGroupedCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editCategoryData, setEditCategoryData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('categories/');
        setCategories(response.data);
        groupCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const groupCategories = (categories) => {
    const grouped = categories.reduce((acc, category) => {
      if (category.parent === null) {
        acc.push({ ...category, subcategories: [] });
      } else {
        const parentIndex = acc.findIndex(cat => cat.id === category.parent);
        if (parentIndex !== -1) {
          acc[parentIndex].subcategories.push(category);
        }
      }
      return acc;
    }, []);
    setGroupedCategories(grouped);
  };

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

      // Remove the category from the state
      const updatedCategories = categories.filter(category => category.id !== id);
      setCategories(updatedCategories);
      groupCategories(updatedCategories);
      setPopupMessage('Category deleted successfully.');
    } catch (error) {
      console.error('Error deleting category:', error);
      setPopupMessage('Failed to delete category. Please try again.');
    }
    setShowPopup(true);
  };

  const handleEditCategory = (category) => {
    setEditCategoryData(category);
  };

  const handleSaveCategory = async (updatedCategory) => {
    try {
      const token = localStorage.getItem('access_token');
      await api.patch(`category/${updatedCategory.id}/`, { name: updatedCategory.name }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Update subcategories
      for (const subcategory of updatedCategory.subcategories) {
        if (subcategory.id) {
          await api.patch(`category/${subcategory.id}/`, { name: subcategory.name }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } else {
          await api.post('category/', { name: subcategory.name, parent: updatedCategory.id }, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        }
      }

      const updatedCategories = categories.map(category =>
        category.id === updatedCategory.id ? { ...category, name: updatedCategory.name, subcategories: updatedCategory.subcategories } : category
      );
      setCategories(updatedCategories);
      groupCategories(updatedCategories);
      setEditCategoryData(null);
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

  const filteredCategories = groupedCategories.filter(category => {
    const categoryMatches = category.name.toLowerCase().includes(searchQuery.toLowerCase());
    const subcategoryMatches = category.subcategories.some(subcategory =>
      subcategory.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return categoryMatches || subcategoryMatches;
  });

  if (!user) {
    return <p>You need to be logged in to view this page.</p>;
  }

  return (
    <div className="view-categories">
      <h2>Categories</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by category or subcategory name..."
          value={searchQuery}
          onChange={handleSearchInput}
        />
      </div>
      <button className="add-category-button" onClick={() => navigate('/admin/add-category')}>
        Add a New Category
      </button>
      <div className="categories-container">
        {user.role === 'admin' ? (
          <table className="categories-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Subcategories</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.map(category => (
                <tr key={category.id}>
                  <td>{highlightText(category.name, searchQuery)}</td>
                  <td>
                    <ul>
                      {category.subcategories && category.subcategories.length > 0 ? (
                        category.subcategories.map(subcategory => (
                          <li key={subcategory.id}>{highlightText(subcategory.name, searchQuery)}</li>
                        ))
                      ) : (
                        <li>No subcategories</li>
                      )}
                    </ul>
                  </td>
                  <td>
                    <button onClick={() => handleEditCategory(category)}>Edit</button>
                    <button onClick={() => handleDeleteCategory(category.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <ul>
            {filteredCategories.map(category => (
              <li key={category.id}>
                {highlightText(category.name, searchQuery)}
                {category.subcategories && category.subcategories.length > 0 && (
                  <ul>
                    {category.subcategories.map(subcategory => (
                      <li key={subcategory.id}>{highlightText(subcategory.name, searchQuery)}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
      {editCategoryData && (
        <EditCategoryPopup
          category={editCategoryData}
          subcategories={editCategoryData.subcategories}
          onSave={handleSaveCategory}
          onCancel={() => setEditCategoryData(null)}
        />
      )}
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default ViewCategories;