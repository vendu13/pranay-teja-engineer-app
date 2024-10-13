import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Input, Text } from "@chakra-ui/react";
import style from "./Login.module.css";
import { useLoginMutation } from "../../../store/user/userApi";
import { useSelector } from "react-redux";
import Loader from "../../Loader/Loader.jsx";
import React, { useState } from "react"; // Ensure React is imported

const Login = () => {
  // Controlled inputs with state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload on form submission
    setIsLoading(true); // Show loading indicator when request starts
    setErrorMessage(""); // Clear any previous error messages

    try {
      // Make the POST request to the backend login endpoint
      const response = await fetch(
        "https://pranay-teja-engineers-bb1370044d4a.herokuapp.com/auth/login", // Ensure correct backend URL
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username, // Send the username from input
            password, // Send the password from input
          }),
        }
      );

      const data = await response.json(); // Parse the response data

      if (response.ok) {
        // Successful login: store the JWT token and redirect to the Admin page
        localStorage.setItem("token", data.token); // Store token securely
        window.location.href = "/admin"; // Redirect to the admin page
      } else {
        // If the response is not OK, show error message from backend
        setErrorMessage(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      // Handle network or unexpected errors
      console.error("Error during login:", err);
      setErrorMessage("An error occurred during login. Please try again.");
    } finally {
      // Hide loading indicator when request completes
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      {/* Display error message if it exists */}
      {errorMessage && <p className="error">{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Admin Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Controlled input
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Controlled input
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Sign In"}{" "}
          {/* Loading state on button */}
        </button>
      </form>
    </div>
  );
};

export default Login;
