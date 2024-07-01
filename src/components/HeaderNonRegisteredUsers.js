import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/views/HeaderGeneral.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faAngleDown } from "@fortawesome/free-solid-svg-icons";

const HeaderNonRegisteredUsers = ({ height }) => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    if (dropdownVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownVisible]);

  return (
    <div className="header" style={{ height }}>
      <div className="left-section">
        <div className="home-button" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={faHome} size="2x" />
          <FontAwesomeIcon icon={faAngleDown} size="1x" />
        </div>
        {dropdownVisible && (
          <div className="dropdown-content" ref={dropdownRef}>
            <span className="dropdown-item" onClick={() => navigate('/')}>Home</span>
            <span className="dropdown-item">
              Shop by Category
              <div className="sub-dropdown-content">
                <span onClick={() => navigate('/categories/electronics')}>Electronics</span>
                <span onClick={() => navigate('/categories/fashion')}>Fashion</span>
                <span onClick={() => navigate('/categories/home-kitchen')}>Home & Kitchen</span>
                <span onClick={() => navigate('/categories/health-beauty')}>Health & Beauty</span>
                <span onClick={() => navigate('/categories/sports-outdoors')}>Sports & Outdoors</span>
                <span onClick={() => navigate('/categories/toys-games')}>Toys & Games</span>
                <span onClick={() => navigate('/categories/books')}>Books</span>
              </div>
            </span>
            <span className="dropdown-item">
              Deals
              <div className="sub-dropdown-content">
                <span onClick={() => navigate('/deals/todays-deals')}>Today's Deals</span>
                <span onClick={() => navigate('/deals/flash-sales')}>Flash Sales</span>
                <span onClick={() => navigate('/deals/clearance')}>Clearance</span>
              </div>
            </span>
            <span className="dropdown-item">
              About Us
              <div className="sub-dropdown-content">
                <span onClick={() => navigate('/about-us/our-story')}>Our Story</span>
                <span onClick={() => navigate('/about-us/careers')}>Careers</span>
                <span onClick={() => navigate('/about-us/press')}>Press</span>
              </div>
            </span>
          </div>
        )}
      </div>
      <div className="middle-section" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
        <h1 className="title">EasyLife</h1>
      </div>
      <div className="right-section">
        <span onClick={() => navigate("/register")} className="nav-item">
          Register
        </span>
        <span onClick={() => navigate("/login")} className="nav-item">
          Login
        </span>
      </div>
    </div>
  );
};

export default HeaderNonRegisteredUsers;