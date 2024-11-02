import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/ForgotPassword.css';

const ForgotPassword = () => {
  return (
    <div className="forgot-password-container">
      <div className="forgot-password-box">
        <h2>Forgot Password</h2>
        <p>Enter your email address to reset your password.</p>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" required />
          </div>
          <button type="submit" className="reset-button">Reset Password</button>
        </form>
        <div className="forgot-password-links">
          <p>
            Remembered your password? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
