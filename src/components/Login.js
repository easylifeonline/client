import React, { useState } from 'react';
import '../styles/views/Register.scss';
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import api from '../helpers/api';
import Popup from './PopupForAll';
import { BeatLoader } from 'react-spinners';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const navigate = useNavigate();
    const { setUser } = useUser();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await api.post('login/', formData);
            
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
            console.error(error);
            setErrorMessage('Login failed: ' + (error.response?.data?.detail || error.message));
            setShowPopup(true);
        } finally {
            setIsLoading(false);
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
                <div className="register-button-container">
                    <button type="submit" className="button" disabled={isLoading}>
                        {isLoading ? <BeatLoader size={15} color="#14e028" /> : "Login"}
                    </button>
                </div>
            </form>
            <div className="register-prompt">
                Don't have an account? <a href="/register">Register here</a>.
            </div>

            {showPopup && (
                <Popup title="Error" message={errorMessage} onClose={closePopup} />
            )}
        </div>
    );
}

export default Login;

