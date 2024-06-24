import React, { useState } from 'react';
import axios from 'axios';
import '../styles/views/Register.scss';
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the context
import Popup from './Popup'; // Import the Popup component

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { setUser } = useUser(); // Use the context to get the setUser function
    const [errorMessage, setErrorMessage] = useState(''); // State for error message
    const [showPopup, setShowPopup] = useState(false); // State to control popup visibility

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8000/api/login/', formData);
            
            // Save tokens
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            
            // Fetch and set the user data
            const userResponse = await axios.get("http://localhost:8000/api/profile/", {
                headers: {
                    Authorization: `Bearer ${response.data.access}`
                }
            });
            setUser(userResponse.data); // Update user in context

            navigate("/home");
        } catch (error) {
            console.error(error);
            setErrorMessage('Login failed: ' + (error.response?.data?.detail || error.message));
            setShowPopup(true); // Show popup with error message
        }
    };

    const closePopup = () => {
        setShowPopup(false);
        setErrorMessage('');
    };

    return (
        <div className="register-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-field">
                    <label className="register-label" htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        className="register-input" 
                        placeholder="Username" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="register-field">
                    <label className="register-label" htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        id="password" 
                        className="register-input" 
                        placeholder="Password" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="register-button-container">
                    <button type="submit" className="button">Login</button>
                </div>
            </form>

            {showPopup && (
                <Popup message={errorMessage} onClose={closePopup} />
            )}
        </div>
    );
}

export default Login;