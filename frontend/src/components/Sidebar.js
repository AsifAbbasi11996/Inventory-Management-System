import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import '../assets/styles/Sidebar.css';
import { MdDashboard, MdAddBox } from "react-icons/md";
import { FaList } from "react-icons/fa6";

const Sidebar = () => {
    const location = useLocation(); // Get current location

    return (
        <div className="sidebar">
            <h2>Beer Shop</h2>
            <ul>
                <li>
                    <Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>
                        <MdDashboard /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/productlist" className={location.pathname === '/productlist' ? 'active-link' : ''}>
                        <FaList /> Product List
                    </Link>
                </li>
                <li>
                    <Link to="/add-product" className={location.pathname === '/add-product' ? 'active-link' : ''}>
                        <MdAddBox /> Add Product
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
