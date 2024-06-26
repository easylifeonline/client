import axios from "axios";
import { getDomain } from "./getDomain";

export const handleError = error => {
  const response = error.response;

  // catch 4xx and 5xx status codes
  if (response && !!`${response.status}`.match(/^[4|5]\d{2}$/)) {
    let info = `\nrequest to: ${response.request.responseURL}`;

    if (response.data.status) {
      info += `\nstatus code: ${response.data.status}`;
      info += `\nerror: ${response.data.error}`;
      info += `\nerror message: ${response.data.message}`;
    } else {
      info += `\nstatus code: ${response.status}`;
      info += `\nerror message:\n${response.data}`;
    }

    console.log("The request was made and answered but was unsuccessful.", error.response);
    
    return info;
  } else {
    if (error.message.match(/Network Error/)) {
      alert("The server cannot be reached.\nDid you start it?");
    }

    console.log("Something else happened.", error);
    
    return error.message;
  }
};

// Create an instance of axios with a base URL
const api = axios.create({
  baseURL: getDomain(), // Replace with your actual base URL
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor to add Authorization header to each request if token exists
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('http://localhost:8000/api/token/refresh/', { refresh: refreshToken });
        localStorage.setItem('access_token', response.data.access);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access;
        return api(originalRequest);
      } catch (e) {
        console.error('Token refresh failed:', e);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/login'; // Redirect to login if refresh fails
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Create an instance of axios for Elasticsearch with a base URL
const elasticsearchApi = axios.create({
  baseURL: 'https://localhost:9200/elasticsearch/',
  headers: {
    'Content-Type': 'application/json',
  }
});

// Handle Elasticsearch-specific errors
elasticsearchApi.interceptors.response.use(
  response => response,
  error => {
    console.error('Elasticsearch error:', error);
    return Promise.reject(error);
  }
);

export { elasticsearchApi };