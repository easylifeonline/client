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