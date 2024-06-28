import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../helpers/api";
import "../styles/views/Header.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "./UserContext";
import Popup from "./Popup";

const Header = ({ height }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [picture, setPicture] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
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

    fetchUserData();
  }, [setUser]);

  const navigateToHome = () => {
    navigate(user ? "/home" : "/");
  };

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

  const handleBecomeVendorClick = () => {
    if (user) {
      navigate("/vendor-contact-form");
    } else {
      navigate("/vendor");
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
    <div className="header" style={{ height }}>
      <div className="left-section" onClick={navigateToHome} style={{ cursor: "pointer" }}>
        <h1 className="title">EasyLife</h1>
      </div>
      <div className="middle-section">
        {user && user.role === "admin" && (
          <div className="nav-item">
            Profiles Management
            <div className="dropdown-content">
              <span onClick={() => navigate("/admin/dashboard")}>View All Profiles</span>
              <span onClick={() => navigate("/admin/add-category")}>Add a Product Category</span>
              <span onClick={() => navigate("/view-categories")}>View Product Categories</span>
              <span onClick={() => navigate("/admin/vendor-requests")}>Vendor Requests</span>
            </div>
          </div>
        )}
        {user && user.role === "vendor" && (
          <div className="nav-item">
            My Products
            <div className="dropdown-content">
              <span onClick={() => navigate("/vendor/products")}>View My Products</span>
              <span onClick={() => navigate("/vendor/add-product")}>Add New Product</span>
              <span onClick={() => navigate("/vendor/inventory")}>Inventory Management</span>
              <span onClick={() => navigate("/vendor/orders")}>View Orders</span>
              <span onClick={() => navigate("/view-categories")}>Platform Categories</span>
            </div>
          </div>
        )}
        {(!user || (user && user.role === "customer")) && (
          <>
            <span className="nav-item" onClick={() => navigate("/contact")}>Contact</span>
            <span className="nav-item" onClick={() => navigate("/about")}>About</span>
            <span className="nav-item" onClick={handleBecomeVendorClick}>Become a Vendor</span>
          </>
        )}
      </div>
      <div className="right-section">
        {user ? (
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
        ) : (
          <>
            <span onClick={() => navigate("/register")} className="nav-item">
              Register
            </span>
            <span onClick={() => navigate("/login")} className="nav-item">
              Login
            </span>
          </>
        )}
      </div>

      {showPopup && (
        <Popup message={errorMessage} onClose={closePopup} />
      )}
    </div>
  );
};

export default Header;

