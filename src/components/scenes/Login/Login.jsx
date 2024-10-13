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
  // State to store username, password, loading state, and error message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // New handleLogin function
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    setIsLoading(true); // Set loading state

    try {
      // API call to your backend login route
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username, password: password }), // Send username and password
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store JWT token in localStorage
        localStorage.setItem("token", data.token);

        // Redirect to the admin page after successful login

        return <Navigate to="/admin" />;
      } else {
        setErrorMessage("Invalid login credentials");
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred during login");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Admin Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default Login;
