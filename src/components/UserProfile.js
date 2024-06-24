import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserAddresses from './UserAddresses';
import '../styles/views/UserProfile.scss';
import { useUser } from './UserContext'; // Import the useUser hook

const UserProfile = () => {
    const { user, setUser } = useUser(); // Use the context to get user state and setUser function
    const [userDetails, setUserDetails] = useState({
        username: user?.username || '',
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        profile_picture: user?.profile_picture || ''
    });
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log("fetching for the user profile")
        if (!user) {
            axios.get('http://localhost:8000/api/profile/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(response => {
                setUserDetails(response.data);
                setUser(response.data); // Update the context with fetched user data
            })
            .catch(error => {
                console.error('Error fetching user details:', error);
            });
        }
    }, [user, setUser]);

    const handleChange = (e) => {
        setUserDetails({
            ...userDetails,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('username', userDetails.username);
        formData.append('first_name', userDetails.first_name);
        formData.append('last_name', userDetails.last_name);
        if (selectedFile) {
            formData.append('profile_picture', selectedFile);
        }

        axios.put('http://localhost:8000/api/profile/', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setUserDetails(response.data);
            setUser(response.data); // Update the context with updated user data
            alert('Profile updated successfully');
        })
        .catch(error => {
            console.error('Error updating profile:', error);
            alert('Update failed');
        });
    };

    return (
        <div className="user-profile-container">
            <h2>My Profile</h2>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    name="username"
                    value={userDetails.username}
                    onChange={handleChange}
                    readOnly // Typically, username should not be changed
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

                <label>Profile Picture</label>
                <input
                    type="file"
                    name="profile_picture"
                    onChange={handleFileChange}
                />

                <button type="submit">Update Profile</button>
            </form>

            <h3>Manage Addresses</h3>
            <UserAddresses /> {/* Embed the UserAddresses component */}
        </div>
    );
};

export default UserProfile;