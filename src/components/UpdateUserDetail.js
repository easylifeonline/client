// UpdateUserDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserAddresses from './UserAddresses'; 
import "../styles/views/UpdateUserDetail.scss";

const UpdateUserDetail = () => {
    const [userDetails, setUserDetails] = useState({
        username: '',
        first_name: '',
        last_name: ''
    });

    useEffect(() => {
        // Fetch user details
        axios.get('http://localhost:8000/api/profile/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => {
            setUserDetails(response.data);
        })
        .catch(error => {
            console.error('Error fetching user details:', error);
        });
    }, []);

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:8000/api/profile/', userDetails, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => {
            alert('User details updated successfully');
        })
        .catch(error => {
            console.error('Error updating user details:', error);
            alert('Update failed');
        });
    };

    return (
        <div className="update-user-detail-container">
            <h2>Update Your Details</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    readOnly // Username is typically not changed once set
                />

                <label>First Name</label>
                <input
                    type="text"
                    name="first_name"
                    value={userDetails.first_name}
                    onChange={handleChange}
                />

                <label>Last Name</label>
                <input
                    type="text"
                    name="last_name"
                    value={userDetails.last_name}
                    onChange={handleChange}
                />

                <button type="submit">Update Details</button>
            </form>
            
            <h3>Manage Addresses</h3>
            <UserAddresses /> {/* Embed UserAddresses component */}
        </div>
    );
};

export default UpdateUserDetail;