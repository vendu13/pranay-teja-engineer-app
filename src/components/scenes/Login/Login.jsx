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


function Login() {
    const [loginHook, {isLoading}] = useLoginMutation();
    const user = useSelector((state) => state.userReducer.user);

   const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent form from submitting prematurely
    setIsLoading(true); // Show loading state

    try {
      // POST request to backend login route
      const response = await fetch(
        'https://pranay-teja-engineers-bb1370044d4a.herokuapp.com/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store the JWT token in localStorage or sessionStorage
        localStorage.setItem('token', data.token);
        // Redirect to the Admin Page
        window.location.href = '/admin';
      } else {
        // Show error message if login failed
        setErrorMessage('Login failed: ' + data.message);
      }
    } catch (err) {
      console.error('Error during login:', err);
      setErrorMessage('An error occurred during login.');
    } finally {
      setIsLoading(false); // Hide loading state
    }
  };

  return (
    <div className="login-container">
      <h2>Log In</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}> {/* Form submission handled here */}
        <div>
          <label htmlFor="username">Admin username</label>
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
          {isLoading ? 'Logging in...' : 'Sign In'} {/* Button shows loading state */}
        </button>
      </form>
    </div>
  );
};

export default Login;
