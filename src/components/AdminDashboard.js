// AdminDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/users/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(response => {
            setUsers(response.data);
        }).catch(error => {
            console.error('Error fetching users:', error);
        });
    }, []);

    const handleRoleChange = (userId, role) => {
        axios.put(`http://localhost:8000/api/users/${userId}/`, { role }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(response => {
            alert('Role updated successfully');
        }).catch(error => {
            console.error('Error updating role:', error);
            alert('Role update failed');
        });
    };

    return (
        <div className="admin-dashboard">
            <h2>User Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <select value={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="vendor">Vendor</option>
                                    <option value="customer">Customer</option>
                                </select>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminDashboard;