import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import Sidebar from '../components/Sidebar.js';
import '../assets/styles/Layout.css';

const Layout = () => {
    return (
        <>
            <Navbar />
            <div className="layout">
                <Sidebar />
                <div className="main-content">
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Layout;
