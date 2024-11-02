import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../assets/styles/ResetPassword.css';

const ResetPassword = () => {
  const { token } = useParams(); // Get the token from the URL
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/user/reset-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resetToken: token, newPassword }), // Send token and new password
      });

      const data = await response.json();
      if (response.ok) {
        setMessage('Password has been reset successfully.'); // Show success message
      } else {
        setMessage(data.message); // Show error message
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.'); // Handle fetch error
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-box">
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)} // Update new password state
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state
              required
            />
          </div>
          <button type="submit" className="reset-button">Reset Password</button>
        </form>
        {message && <p className="message">{message}</p>} {/* Display message */}
        <div className="reset-password-links">
          <p>
            Remembered your password? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
