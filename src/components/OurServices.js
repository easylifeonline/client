import React from "react";
import { categories } from "./shared/categories";
import "../styles/views/OurServices.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const OurServices = () => {
    return (
        <div className="our-services">
            <ul className="services-list">
                {categories.map((category, index) => (
                    <li key={index}>
                        <a href={`/services/${category.toLowerCase().replace(/ /g, "-")}`} className="service-link">
                            {category}
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
