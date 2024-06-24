// api.js
import axios from 'axios';

// Create an instance of axios with a base URL
const api = axios.create({
  baseURL: 'http://localhost:8000/api/', // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor to add Authorization header to each request if token exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token'); // Adjust if you're storing the token differently
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;

