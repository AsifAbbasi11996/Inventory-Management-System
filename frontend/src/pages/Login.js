import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../api/userApi.js';
import '../assets/styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });

      console.log("Login successful:", response); // Log the user data to the console

      // Store the token and user data in local storage or state management (optional)
      localStorage.setItem('token', response.token);
      localStorage.setItem('userId', response.userId);
      localStorage.setItem('userName', response.name);
      localStorage.setItem('userEmail', response.email);

      // Navigate to the next page (e.g., dashboard or home page)
      navigate('/dashboard');
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back</h2>
        <p>Enter your credentials to login</p>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type={showPassword ? 'text' : 'password'} 
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className='show_password'>
              <input
                type='checkbox'
                id="check"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
              />
              <label htmlFor='check'>Show Password</label>
            </p>
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-links">
          <Link to="/forgot-password">Forgot password?</Link>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;