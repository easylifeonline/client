import React from 'react';
import '../styles/views/Breadcrumbs.scss';

const Breadcrumbs = ({ category }) => {
  return (
    <div className="breadcrumbs">
      <span>Home</span> &gt; <span>Help Center</span>
      {category && (
        <>
          {' '} &gt; <span>{category}</span>
        </>
      )}
    </div>
  );
};

export default Breadcrumbs;
