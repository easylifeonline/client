import React, { useState } from 'react';
import axios from 'axios';
import '../styles/views/Register.scss'; 
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the UserContext to update the user state

function Register() {
    const navigate = useNavigate();
    const { setUser } = useUser(); // Use the context to set the user
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.password2) {
            alert("Passwords do not match");
            return;
        }

        try {
            // Registration request
            await axios.post('http://localhost:8000/api/register/', formData);
            alert("Registration successful");

            // Automatically log in the user after successful registration
            await loginUser();
        } catch (error) {
            console.error(error);
            alert("Registration failed: " + error.response?.data?.detail || "An error occurred while registering");
        }
    };

    const loginUser = async () => {
        try {
            const response = await axios.post('http://localhost:8000/api/login/', {
                username: formData.username,
                password: formData.password
            });

            // Save the JWT tokens in local storage
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Fetch and set the user data in the context
            const userResponse = await axios.get("http://localhost:8000/api/profile/", {
                headers: {
                    Authorization: `Bearer ${response.data.access}`
                }
            });
            setUser(userResponse.data); // Update user in context

            navigate("/home");
        } catch (error) {
            console.error("Login failed:", error);
            alert("Login failed. Please try logging in manually.");
        }
    };

    return (
        <div className="register-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit} className="register-form">
                <div className="register-field">
                    <label className="register-label" htmlFor="username">Username</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username" 
                        className="register-input" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="register-field">
                    <label className="register-label" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email" 
                        className="register-input" 
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
                        onChange={handleChange} 
                    />
                </div>
                <div className="register-field">
                    <label className="register-label" htmlFor="password2">Confirm Password</label>
                    <input 
                        type="password" 
                        name="password2" 
                        id="password2" 
                        className="register-input" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="register-field">
                    <label className="register-label" htmlFor="first_name">First Name</label>
                    <input 
                        type="text" 
                        name="first_name" 
                        id="first_name" 
                        className="register-input" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="register-field">
                    <label className="register-label" htmlFor="last_name">Last Name</label>
                    <input 
                        type="text" 
                        name="last_name" 
                        id="last_name" 
                        className="register-input" 
                        onChange={handleChange} 
                    />
                </div>
                <div className="register-button-container">
                    <button type="submit" className="button">Register</button>
                </div>
            </form>
        </div>
    );
}

export default Register;