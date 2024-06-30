import React from 'react';
import '../styles/views/CategoriesOverview.scss';

const CategoriesOverview = ({ categories }) => {
  return (
    <div className="categories-overview">
      {categories.map(category => (
        <div key={category.id} className="category-item">
          <img src={category.image} alt={category.name} className="category-image" />
          <div className="category-info">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesOverview;
