// PasswordResetRequest.js

import React, { useState } from 'react';
import axios from 'axios';

const PasswordResetRequest = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/password_reset/', { email })
            .then(response => {
                alert('Password reset link sent to your email');
            })
            .catch(error => {
                console.error('Error requesting password reset:', error);
                alert('Password reset request failed');
            });
    };

    return (
        <div className="password-reset-request">
            <h2>Password Reset</h2>
            <form onSubmit={handleSubmit}>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Send Reset Link</button>
            </form>
        </div>
    );
};

export default PasswordResetRequest;