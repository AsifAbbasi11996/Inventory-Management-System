import React from 'react';
import Dashboard from '../components/Dashboard';
import '../assets/styles/DashboardPage.css';
// import TopProducts from '../components/TopProducts';

const DashboardPage = () => {
    return (
        <div className="dashboard-page">
            <Dashboard />
            {/* <TopProducts /> */}
        </div>
    );
};

export default DashboardPage;
