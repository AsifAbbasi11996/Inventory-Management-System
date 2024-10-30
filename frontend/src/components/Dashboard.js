import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Register all necessary components
Chart.register(...registerables);

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const products = await getProducts();
            setTotalProducts(products.length);
            const categories = new Set(products.map(product => product.category));
            setTotalCategories(categories.size);
            const sales = products.reduce((acc, product) => acc + (product.price * product.stock), 0);
            setTotalSales(sales);

            // Low stock count (e.g., threshold of 5)
            const lowStock = products.filter(product => product.stock < 5);
            setLowStockCount(lowStock.length);

            // Aggregated sales for each product
            const aggregatedSales = {};
            products.forEach(product => {
                if (!aggregatedSales[product.name]) {
                    aggregatedSales[product.name] = {
                        ...product,
                        totalSales: product.price * product.stock,
                    };
                } else {
                    aggregatedSales[product.name].totalSales += product.price * product.stock;
                }
            });

            // Convert aggregated sales to an array
            const salesDataArray = Object.values(aggregatedSales);
            setSalesData(salesDataArray);

            // Top selling products based on total sales
            const sortedProducts = salesDataArray.sort((a, b) => b.totalSales - a.totalSales);
            setTopSellingProducts(sortedProducts.slice(0, 5)); // Get top 5 selling products
        };

        fetchData();
    }, []);

    const salesChartData = {
        labels: salesData.map(product => product.name),
        datasets: [{
            label: 'Sales',
            data: salesData.map(product => product.totalSales),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }],
    };

    const navigatetoProducts = ()=> {
        window.location.href = "/productlist";
    }
    const navigatetolowStock = ()=> {
        window.location.href = "/lowstockproducts";
    }

    return (
        <div className="dashboard">
            <h2>Dashboard Overview</h2>
            <div className="dashboard-cards">
                <div className="card products" onClick={navigatetoProducts}>
                    <h3>Total Products</h3>
                    <p>{totalProducts}</p>
                </div>
                <div className="card categories">
                    <h3>Total Categories</h3>
                    <p>{totalCategories}</p>
                </div>
                <div className="card sales">
                    <h3>Total Sales</h3>
                    <p>${totalSales.toFixed(2)}</p>
                </div>
                <div className="card low-stock" onClick={navigatetolowStock}>
                    <h3>Low Stock Products</h3>
                    <p>{lowStockCount}</p>
                </div>
            </div>
            <div className='top_selling_products'>
                <h3>Top Selling Products</h3>
                <ul>
                    {topSellingProducts.map(product => (
                        <li key={product.barcode}>
                            {product.name} - ${product.price.toFixed(2)} (Stock: {product.stock}, Total Sales: ${product.totalSales.toFixed(2)})
                        </li>
                    ))}
                </ul>
            </div>
            <div className='sales_chart'>
                <h3>Sales Chart</h3>
                <Bar data={salesChartData} />
            </div>
        </div>
    );
};

export default Dashboard;
