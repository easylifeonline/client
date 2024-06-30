import React, { useState } from 'react';
import '../styles/views/EditCategoryPopup.scss';

const EditCategoryPopup = ({ category, subcategories, onSave, onCancel }) => {
  const [categoryName, setCategoryName] = useState(category.name);
  const [updatedSubcategories, setUpdatedSubcategories] = useState(subcategories);

  const handleSubcategoryChange = (index, value) => {
    const updated = [...updatedSubcategories];
    updated[index].name = value;
    setUpdatedSubcategories(updated);
  };

  const handleAddSubcategory = () => {
    setUpdatedSubcategories([...updatedSubcategories, { id: null, name: '' }]);
  };

  const handleRemoveSubcategory = (index) => {
    const updated = [...updatedSubcategories];
    updated.splice(index, 1);
    setUpdatedSubcategories(updated);
  };

  const handleSave = () => {
    onSave({ id: category.id, name: categoryName, subcategories: updatedSubcategories });
  };

  return (
    <div className="edit-category-popup">
      <div className="popup-content">
        <h3>Edit Category</h3>
        <label>
          Category Name:
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </label>
        <div className="subcategories-edit">
          {updatedSubcategories.map((subcategory, index) => (
            <div key={index} className="subcategory-row">
              <input
                type="text"
                value={subcategory.name}
                onChange={(e) => handleSubcategoryChange(index, e.target.value)}
                placeholder="Subcategory name"
              />
              <button className="remove-button" onClick={() => handleRemoveSubcategory(index)}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleAddSubcategory}>+ Add Subcategory</button>
        </div>
        <div className="popup-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryPopup;
