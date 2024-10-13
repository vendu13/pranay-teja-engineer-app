import {useForm} from 'react-hook-form';
import {Navigate} from 'react-router-dom';
import {HiOutlineMail} from 'react-icons/hi';
import {RiLockPasswordFill} from 'react-icons/ri';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {Input, Text} from '@chakra-ui/react';
import style from './Login.module.css';
import {useLoginMutation} from '../../../store/user/userApi';
import {useSelector} from "react-redux";
import Loader from "../../Loader/Loader.jsx";
import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://pranay-teja-engineers-bb1370044d4a.herokuapp.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/admin';
      } else {
        setErrorMessage('Login failed: ' + data.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setErrorMessage('An error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Admin username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

// Ensure this export statement is outside and after the component
export default Login;
