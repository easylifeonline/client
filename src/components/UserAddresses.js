import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/views/UserAddresses.scss';

const UserAddresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [newAddress, setNewAddress] = useState({
        street_name: '',
        house_number: '',
        zip_code: '',
        city: '',
        state: '',
        country: ''
    });

    useEffect(() => {
        axios.get('http://localhost:8000/api/addresses/', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(response => {
            setAddresses(response.data);
        }).catch(error => {
            console.error('Error fetching addresses:', error);
        });
    }, []);

    const handleChange = (e) => {
        setNewAddress({
            ...newAddress,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/addresses/', newAddress, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(response => {
            setAddresses([...addresses, response.data]);
            setNewAddress({
                street_name: '',
                house_number: '',
                zip_code: '',
                city: '',
                state: '',
                country: ''
            });
        }).catch(error => {
            console.error('Error adding address:', error);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/addresses/${id}/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
        }).then(() => {
            setAddresses(addresses.filter(address => address.id !== id));
        }).catch(error => {
            console.error('Error deleting address:', error);
        });
    };

    return (
        <div className="addresses-container">
            <h2>My Addresses</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="street_name" placeholder="Street Name" value={newAddress.street_name} onChange={handleChange} required />
                <input type="text" name="house_number" placeholder="House Number" value={newAddress.house_number} onChange={handleChange} required />
                <input type="text" name="zip_code" placeholder="Zip Code" value={newAddress.zip_code} onChange={handleChange} required />
                <input type="text" name="city" placeholder="City" value={newAddress.city} onChange={handleChange} required />
                <input type="text" name="state" placeholder="State" value={newAddress.state} onChange={handleChange} required />
                <input type="text" name="country" placeholder="Country" value={newAddress.country} onChange={handleChange} required />
                <button type="submit">Add Address</button>
            </form>
            <ul>
                {addresses.map(address => (
                    <li key={address.id}>
                        {`${address.street_name}, ${address.house_number}, ${address.city}, ${address.state}, ${address.country}`}
                        <button onClick={() => handleDelete(address.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserAddresses;