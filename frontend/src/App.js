import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';
import Layout from './pages/Layout';
import LowStockProducts from './components/LowStockProducts';
import Scanner from './components/BarcodeScanner';
import PurchaseManager from './components/PurchaseManager';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import AllOrders from './components/AllOrders';
import OrderHistory from './components/OrderHistory';
import FilteredOrders from './components/FilteredOrders';
import Reports from './components/Reports';
import UserList from './components/UserList';
import AddProductFormpage from './pages/AddProductFormpage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password' element={<ResetPassword />} />

                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/productlist" element={<InventoryPage />} />
                    <Route path="/add-product" element={<AddProductFormpage />} />
                    <Route path="/userlist" element={<UserList />} />
                    <Route path="/lowstockproducts" element={<LowStockProducts />} />
                    <Route path="/scan" element={<Scanner />} />
                    <Route path="/billing" element={<PurchaseManager />} />
                    <Route path="/orders" element={<AllOrders />} />
                    <Route path="/orderhistory" element={<OrderHistory />} />
                    <Route path="/filtered-orders/:filter" element={<FilteredOrders />} />
                    <Route path="/reports" element={<Reports />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;