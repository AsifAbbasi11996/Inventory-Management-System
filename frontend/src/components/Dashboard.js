import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';
import { getTotalOrderCount, getTotalSales, getTotalProducts } from '../api/productApi.js'; // Ensure you import your API functions

const Dashboard = ({ totalCategories, lowStockCount, topSellingProducts }) => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [totalOrderCount, setTotalOrderCount] = useState(0);
    const navigate = useNavigate()

    // Fetch data when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await getTotalProducts();
                setTotalProducts(productsResponse.totalProducts); // Assuming the API returns { totalProducts: <count> }

                const salesResponse = await getTotalSales();
                setTotalSales(salesResponse.totalSales); // Assuming the API returns { totalSales: <amount> }

                const orderCountResponse = await getTotalOrderCount();
                setTotalOrderCount(orderCountResponse.totalOrderCount); // Assuming the API returns { totalOrderCount: <count> }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    const navigateToAllProducts =() => {
        navigate('/productlist')
    }

    const navigateToLowStock = () => {
        navigate('/lowstockproducts')
    }

    return (
        <div className="dashboard">
            <h2>Dashboard Overview</h2>
            <div className="dashboard-cards">
                <div className="card products" onClick={navigateToAllProducts}>
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>
                <div className="card categories">
                    <h3>Total Categories</h3>
                    <p>{totalCategories}</p>
                </div>
                <div className="card sales">
                    <h3>Total Sales</h3>
                    <p>{formatPrice(totalSales.toFixed(2))}</p>
                </div>
                <div className="card low-stock" onClick={navigateToLowStock}>
                    <h3>Low Stock Products</h3>
                    <p>{lowStockCount}</p>
                </div>
                <div className="card order-count">
                    <h3>Total Orders</h3>
                    <p>{totalOrderCount}</p>
                </div>
            </div>

            <div className="top_selling_products">
                <h3>Top Selling Products</h3>
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
