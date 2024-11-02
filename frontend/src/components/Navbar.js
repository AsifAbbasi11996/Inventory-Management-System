import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import '../assets/styles/Navbar.css';
import { BsBoxArrowLeft } from "react-icons/bs";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const userName = localStorage.getItem('userName');

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('userName');
    localStorage.removeItem('token'); // Assuming you store token for authentication
    // Navigate to the login page
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className='logo'>
        <h2>Beer Shop</h2>
      </div>
      <div className='navbar-center'>
        <h3>Inventory Management System</h3>
      </div>
      <div className="navbar-right">
        <p>Welcome, <span>{userName ? userName : 'Guest'}</span></p>
        <p>|</p>
        <p className='logout' onClick={handleLogout}>
          <BsBoxArrowLeft /> Logout
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
