import React, { useState } from 'react';
import '../styles/views/Register.scss';
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import api from '../helpers/api';
import { BeatLoader } from 'react-spinners';

function Register() {
    const navigate = useNavigate();
    const { setUser } = useUser();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: ''
    });
    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);

        try {
            await api.post('register/', formData);
            alert("Registration successful");

            await loginUser();
        } catch (error) {
            console.error(error);
            alert("Registration failed: " + (error.response?.data?.detail || "An error occurred while registering"));
        } finally {
            setIsLoading(false);
        }
    };

    const loginUser = async () => {
        try {
            const response = await api.post('login/', {
                username: formData.username,
                password: formData.password
            });

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            const userResponse = await api.get("profile/", {
                headers: {
                    Authorization: `Bearer ${response.data.access}`
                }
            });
            setUser(userResponse.data);

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
                        required
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
                        required
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
                        required
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
                        required
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
                    <button type="submit" className="button" disabled={isLoading}>
                        {isLoading ? <BeatLoader size={15} color="#14e028" /> : "Register"}
                    </button>
                </div>
            </form>
            <div className="register-prompt">
                Do you already have an account? If yes, <a href="/login">Sign In here</a>.
            </div>
        </div>
    );
}

export default Register;