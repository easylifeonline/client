// PasswordResetConfirm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PasswordResetConfirm = () => {
    const { uidb64, token } = useParams();
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== password2) {
            alert('Passwords do not match');
            return;
        }

        axios.post(`http://localhost:8000/api/reset/${uidb64}/${token}/`, { password })
            .then(response => {
                alert('Password has been reset successfully');
            })
            .catch(error => {
                console.error('Error resetting password:', error);
                alert('Password reset failed');
            });
    };

    return (
        <div className="password-reset-confirm">
            <h2>Reset Your Password</h2>
            <form onSubmit={handleSubmit}>
                <label>New Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <label>Confirm New Password</label>
                <input type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} required />

                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default PasswordResetConfirm;