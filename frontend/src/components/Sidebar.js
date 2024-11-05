import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../assets/styles/Sidebar.css';
import { MdDashboard, MdAddBox, MdAccountCircle, MdArrowRight } from "react-icons/md";
import { FaList, FaBoxOpen } from "react-icons/fa6";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { FaInbox, FaBoxes } from "react-icons/fa";
import { VscTasklist } from "react-icons/vsc";
import { TbReportSearch } from "react-icons/tb";

const Sidebar = () => {
    const location = useLocation();
    const [isOrdersOpen, setIsOrdersOpen] = useState(false); // Dropdown state

    const toggleOrdersDropdown = () => setIsOrdersOpen(!isOrdersOpen); // Toggle function

    return (
        <div className="sidebar">
            <ul>
                <li>
                    <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active-link' : ''}>
                        <MdDashboard /> Dashboard
                    </Link>
                </li>
                <li>
                    <Link to="/userlist" className={location.pathname === '/userlist' ? 'active-link' : ''}>
                        <MdAccountCircle /> Users
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
                    <div className="dropdown" onClick={toggleOrdersDropdown}>
                        <Link to="#" className={location.pathname.startsWith('/order') ? 'active-link' : ''}>
                            <FaBoxOpen /> Orders
                            <MdArrowRight className={`arrow-icon ${isOrdersOpen ? 'rotate' : ''}`} />
                        </Link>
                    </div>
                    {isOrdersOpen && (
                        <ul className="dropdown-menu">
                            <li>
                                <Link to="/orders" className={location.pathname === '/orders' ? 'active-link' : ''}>
                                    <FaBoxes /> All Orders
                                </Link>
                            </li>
                            <li>
                                <Link to="/orderhistory" className={location.pathname === '/orderhistory' ? 'active-link' : ''}>
                                    <VscTasklist /> Order History
                                </Link>
                            </li>
                        </ul>
                    )}
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
