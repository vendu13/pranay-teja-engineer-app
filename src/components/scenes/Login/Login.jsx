import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate for redirection
import style from "./Login.module.css"; // Assuming there's some styling file

const Login = () => {
  const [username, setUsername] = useState(""); // State to track username input
  const [password, setPassword] = useState(""); // State to track password input
  const [errorMessage, setErrorMessage] = useState(""); // State to track error message
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const navigate = useNavigate(); // Hook to navigate/redirect

  // Handle form submit
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading to true while request is processed
    setErrorMessage(""); // Reset the error message

    try {
      // Make the POST request to the login API
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }), // Send username and password as JSON in the body
        }
      );

      const data = await response.json(); // Parse the JSON response

      if (response.ok) {
        // Store user or token if needed in localStorage/sessionStorage
        // localStorage.setItem("token", data.token);

        // Redirect to Admin page
        navigate("/admin");
      } else {
        // If login fails, show error message
        setErrorMessage(data.message || "Invalid login credentials");
      }
    } catch (err) {
      console.error(err); // Log the error for debugging
      setErrorMessage("An error occurred during login.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className={style.loginContainer}>
      <h2>Log In</h2>
      {errorMessage && (
        <p className={style.errorMessage}>{errorMessage}</p>
      )}{" "}
      {/* Show error if present */}
      <form onSubmit={handleLogin}>
        {" "}
        {/* Bind form submit to handleLogin */}
        <div>
          <label htmlFor="username">Admin Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update username state on input change
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state on input change
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Sign In"} {/* Show loading state */}
        </button>
      </form>
    </div>
  );
};

export default Login;
