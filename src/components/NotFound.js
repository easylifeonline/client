import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext"; // Import the UserContext
import "../styles/views/NotFound.scss"; // Assuming your styles are correctly set up

const NotFound = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // Get the user from UserContext

  // Function to navigate based on user authentication status
  const navigateToHome = () => {
    navigate(user ? "/home" : "/");
  };

  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <button onClick={navigateToHome}>Go to Home</button>
    </div>
  );
};

export default NotFound;