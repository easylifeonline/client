import React, { useEffect, useState } from 'react';
import '../styles/views/CategoryList.scss';
import api from '../helpers/api';

const CategoryList = ({ setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('help-center/categories');
      setCategories(response.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="category-list">
      <h2>Help Categories</h2>
      <ul>
        {categories.map((category) => (
          <li key={category.id} onClick={() => setSelectedCategory(category.name)}>
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
