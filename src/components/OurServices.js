import React, { useState, useEffect } from "react";
import api from "../helpers/api";
import "../styles/views/OurServices.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faShoppingCart } from "@fortawesome/free-solid-svg-icons";

const OurServices = () => {
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('categories/');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchCartItems = async () => {
            if (token) {
                try {
                    const response = await api.get('cart/', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    setCartItems(response.data.items);
                } catch (error) {
                    console.error('Error fetching cart items:', error);
                }
            } else {
                const localCart = JSON.parse(localStorage.getItem('cart')) || { items: [] };
                setCartItems(localCart.items);
            }
        };

        fetchCategories();
        fetchCartItems();
    }, [token]);

    return (
        <div className="our-services">
            <ul className="services-list">
                {categories.map((category, index) => (
                    <li key={index}>
                        <a href={`/view-products/${category.name}`} className="service-link">
                            {category.name}
                            {index < categories.length - 1 && <span className="separator"></span>}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="search-section">
                <a href="/cart" className="cart-icon-container" title="Current items">
                    <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
                    {cartItems.length > 0 && (
                        <div className="cart-item-count">
                            {cartItems.length}
                        </div>
                    )}
                </a>
                <div className="search-container">
                    <input type="text" placeholder="Search products..." className="search-input" />
                    <button className="search-button">
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OurServices;


