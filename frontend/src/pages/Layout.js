import React from 'react';
import Sidebar from '../components/Sidebar.js';
import '../assets/styles/Layout.css'; 

const Layout = ({ children }) => {
    return (
        <div className="layout">
            <Sidebar />
            <div className="main-content">
                {children}
            </div>
        </div>
    );
};

export default Layout;
