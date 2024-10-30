import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InventoryPage from './pages/InventoryPage';
import DashboardPage from './pages/DashboardPage';
import './App.css';
import AddProductForm from './components/AddProductForm';
import Layout from './pages/Layout';
import LowStockProducts from './components/LowStockProducts';
import Scanner from './components/BarcodeScanner';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/productlist" element={<InventoryPage />} />
                    <Route path="/add-product" element={<AddProductForm />} />
                    <Route path="/lowstockproducts" element={<LowStockProducts />} />
                    <Route path="/scan" element={<Scanner />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;