import React, { useState, useEffect } from "react";
import api from "../helpers/api";
import "../styles/views/OurServices.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const OurServices = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await api.get('categories/');
                setCategories(response.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="our-services">
            <ul className="services-list">
                {categories.map((category, index) => (
                    <li key={index}>
                        <a href={`/services/${category.name.toLowerCase().replace(/ /g, "-")}`} className="service-link">
                            {category.name}
                            {index < categories.length - 1 && <span className="separator"></span>}
                        </a>
                    </li>
                ))}
            </ul>
            <div className="search-section">
                <input type="text" placeholder="Search products..." className="search-input" />
                <button className="search-button">
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
        </div>
    );
};

export default OurServices;
