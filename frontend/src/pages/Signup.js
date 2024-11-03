import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, fetchRoles } from '../api/userApi.js'; // Import the fetchRoles function
import '../assets/styles/Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('');
  const [roles, setRoles] = useState([]); // State to store roles
  const navigate = useNavigate();

  // Fetch roles on component mount
  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await fetchRoles(); // Fetch roles from backend
        console.log(response)
        setRoles(response.roles); // Set the roles in state
      } catch (error) {
        console.error("Error fetching roles:", error.message);
      }
    };
    getRoles();
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await createUser({ name, email, password, phoneNumber: phone, role });
      console.log("Signup successful:", response); // Log the user data to the console

      // Redirect to login page after successful sign-up
      navigate('/');
    } catch (error) {
      console.error("Signup failed:", error.response?.data?.message || error.message);
      alert(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign Up</h2>
        <p>Create your account</p>
        <form onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="role">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="" disabled>Select your role</option>
              {roles.map((roleOption) => (
                <option key={roleOption} value={roleOption}>
                  {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                </option>
              ))}
            </select>
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
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        <div className="signup-links">
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
