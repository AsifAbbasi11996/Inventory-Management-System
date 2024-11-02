import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import '../assets/styles/Sidebar.css';
import { MdDashboard, MdAddBox, MdAccountCircle  } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaInbox } from "react-icons/fa";
import { VscTasklist } from "react-icons/vsc";
import { TbReportSearch } from "react-icons/tb";

const Sidebar = () => {
    const location = useLocation(); // Get current location

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/dashboard" className={location.pathname === '/' ? 'active-link' : ''}>
                    <MdDashboard/> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/userlist" className={location.pathname === '/userlist' ? 'active-link' : ''}>
                    <MdAccountCircle/> Users
                    </Link>
                </li>
                <li>
                    <Link to="/productlist" className={location.pathname === '/productlist' ? 'active-link' : ''}>
                        <FaList /> Product List
                    </Link>
                </li>
                <li>
                    <Link to="/add-product" className={location.pathname === '/add-product' ? 'active-link' : ''}>
                        <MdAddBox /> Add New Product
                    </Link>
                </li>
                <li>
                    <Link to="/lowstockproducts" className={location.pathname === '/lowstockproducts' ? 'active-link' : ''}>
                        <FaInbox /> Low Stock Products
                    </Link>
                </li>
                <li>
                    <Link to="/billing" className={location.pathname === '/billing' ? 'active-link' : ''}>
                        <BiSolidPurchaseTag /> Sales and Billing
                    </Link>
                </li>
                <li>
                    <Link to="/orderhistory" className={location.pathname === '/orderhistory' ? 'active-link' : ''}>
                        <VscTasklist /> Order History
                    </Link>
                </li>
                <li>
                    <Link to="/reports" className={location.pathname === '/reports' ? 'active-link' : ''}>
                        <TbReportSearch /> Reports
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
