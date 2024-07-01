import React from 'react';
import '../styles/views/SearchBar.scss';

const SearchBar = ({ setSearchQuery }) => {
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search help topics..."
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;