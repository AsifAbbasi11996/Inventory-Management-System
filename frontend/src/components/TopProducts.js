import React, { useEffect, useState } from 'react';
import { getProductOrderCounts } from '../api/orderApi.js'; // Adjust the import path as needed
import '../assets/styles/TopProducts.css'

const TopProducts = () => {
    const [orderCounts, setOrderCounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrderCounts = async () => {
            try {
                const data = await getProductOrderCounts();
                setOrderCounts(data); // Assuming data is an array of order count objects
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderCounts();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    return (
        <div className="top-products-container">
            <h2 className="title">Top Products by Order Count</h2>
            <ul className="product-list">
                {orderCounts.map((product) => (
                    <li key={product.productId} className="product-item">
                        <span className="product-name">{product.name}</span>: 
                        <span className="order-count">{product.orderCount} orders</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopProducts;
