import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/views/HeaderGeneral.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHome, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import api from "../helpers/api";
import { useUser } from "./UserContext";
import Popup from "./Popup";

const HeaderCustomer = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [picture, setPicture] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef(null);

  const fetchUserData = async () => {
    const token = localStorage.getItem("access_token");

    if (token) {
      try {
        const response = await api.get("profile/", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUser(response.data);
        setPicture(response.data.profile_picture);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        localStorage.removeItem("access_token");
        setErrorMessage("Failed to fetch user data. " + (error.response?.data?.detail || error.message));
        setShowPopup(true);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("access_token");

      await api.post("logout/", null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      setUser(null);
      setPicture(null);
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      setErrorMessage("Failed to log out. Reason: " + (error.response?.data?.detail || error.message));
      setShowPopup(true);
    }
  };

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

  const closePopup = () => {
    setShowPopup(false);
    setErrorMessage('');
  };

  return (
    <div className="header">
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
              Orders
              <div className="sub-dropdown-content">
                <span onClick={() => navigate('/orders/track-order')}>Track Order</span>
                <span onClick={() => navigate('/orders/order-history')}>Order History</span>
                <span onClick={() => navigate('/orders/returns-refunds')}>Returns & Refunds</span>
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
        <div className="profile-dropdown" ref={dropdownRef}>
          <span className="profile-button" onClick={toggleDropdown}>
            {picture ? (
              <img src={picture} alt="Profile" className="profile-picture" />
            ) : (
              <FontAwesomeIcon icon={faUserCircle} size="2x" />
            )}
          </span>
          {dropdownVisible && (
            <div className="dropdown-content">
              <span onClick={() => navigate("/profile")}>View Profile</span>
              <span onClick={() => navigate("/profile/update")}>Update Account</span>
              <span onClick={() => navigate("/profile/orders")}>Orders</span>
              <span onClick={() => navigate("/profile/account")}>Account Management</span>
              <span onClick={() => navigate("/profile/settings")}>Settings</span>
              <span onClick={handleLogout}>Logout</span>
            </div>
          )}
        </div>
      </div>

      {showPopup && (
        <Popup message={errorMessage} onClose={closePopup} />
      )}
    </div>
  );
};

export default HeaderCustomer;