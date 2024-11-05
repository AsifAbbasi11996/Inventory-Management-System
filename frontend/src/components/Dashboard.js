import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { getTotalOrderCount, getTotalSales, getTotalProducts } from '../api/productApi.js';
import FilterDropdown from './FilterDropdown'; // Import your dropdown component

const Dashboard = ({ totalCategories, lowStockCount, topSellingProducts }) => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrderCount, setTotalOrderCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await getTotalProducts();
                setTotalProducts(productsResponse.totalProducts);
                const salesResponse = await getTotalSales();
                setTotalSales(salesResponse.totalSales);
                const orderCountResponse = await getTotalOrderCount();
                setTotalOrderCount(orderCountResponse.totalOrderCount);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    const navigateTo = (path) => {
        navigate(path);
    };

    const handleFilterSelect = (filter) => {
        if (filter === 'custom') {
            // Navigate to the custom filter page, use a different route if needed
            navigate(`/filtered-orders/custom`);
        } else {
            // For predefined filters
            navigate(`/filtered-orders/${filter}`);
        }
    };


    return (
        <div className="dashboard">
            <h2>Dashboard Overview</h2>
            <div className="dashboard-cards">
                <div className='grid products'>
                    <div className="card" onClick={() => navigateTo('/productlist')}>
                        <h3>Total Products</h3>
                        <p>{totalProducts}</p>
                    </div>
                </div>
                <div className='grid categories'>
                    <div className="card">
                        <h3>Total Categories</h3>
                        <p>{totalCategories}</p>
                    </div>
                </div>
                <div className='grid sales'>
                    <div className="card">
                        <h3>Total Sales</h3>
                        <p>{formatPrice(totalSales.toFixed(2))}</p>
                    </div>
                </div>
                <div className='grid low-stock'>
                    <div className="card " onClick={() => navigateTo('/lowstockproducts')}>
                        <h3>Low Stock Products</h3>
                        <p>{lowStockCount}</p>
                    </div>
                </div>
                <div className='grid order-count'>
                    <div className="card" onClick={() => navigateTo('/orders')}>
                        <h3>Total Orders</h3>
                        <p>{totalOrderCount}</p>
                    </div>
                    <div className='filter'>
                        <FilterDropdown onFilterSelect={handleFilterSelect} />
                    </div>
                </div>
            </div>
            <div className="top_selling_products">
                <h3>Top Selling Orders</h3>
                <ul>
                    {topSellingProducts.slice(0, 5).map(product => (
                        <li key={product.barcode}>
                            {product.name} - {formatPrice(product.price)} (Stock: {product.stock}, Orders: {product.orderCount}, Total Sales: {formatPrice(product.sales)})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
