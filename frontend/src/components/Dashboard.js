import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productApi';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { formatPrice } from '../utils/formatPrice';

// Register all necessary components for Chart.js
Chart.register(...registerables);

const Dashboard = () => {
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);
    const [totalSales, setTotalSales] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [salesData, setSalesData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const products = await getAllProducts();
            setTotalProducts(products.length);
            const categories = new Set(products.map(product => product.category));
            setTotalCategories(categories.size);
            const sales = products.reduce((acc, product) => acc + (product.price * product.stock), 0);
            setTotalSales(sales);
            const lowStock = products.filter(product => product.stock < 6);
            setLowStockCount(lowStock.length);

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

            const salesDataArray = Object.values(aggregatedSales);
            setSalesData(salesDataArray);
            const sortedProducts = salesDataArray.sort((a, b) => b.totalSales - a.totalSales);
            setTopSellingProducts(sortedProducts.slice(0, 5));
        };

        fetchData();
    }, []);

    const handleFilterChange = () => {
        // Filtering logic can be added here
        console.log('Filtering between:', startDate, endDate);
    };

    const salesChartData = {
        labels: salesData.map(product => product.name),
        datasets: [{
            label: 'Total Sales ($)',
            data: salesData.map(product => product.totalSales),
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            borderRadius: 8,
            barPercentage: 0.8,
            categoryPercentage: 0.5,
        }],
    };

    const salesChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: 'rgba(200, 200, 200, 0.2)',
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 13,
                    },
                },
                title: {
                    display: true,
                    text: 'Total Sales (Rs)',
                    color: '#333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    },
                },
                title: {
                    display: true,
                    text: 'Product Names',
                    color: '#333',
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                titleColor: '#fff',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                padding: 10,
                cornerRadius: 8,
            },
        },
    };

    const navigatetoProducts = () => {
        window.location.href = "/productlist";
    };

    const navigatetolowStock = () => {
        window.location.href = "/lowstockproducts";
    };

    return (
        <div className="dashboard">
            <h2>Dashboard Overview</h2>
            <div className="date-filter">
                <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} />
                <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} />
                <button onClick={handleFilterChange}>Filter</button>
            </div>
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
                            {product.name} - {formatPrice(product.price.toFixed(2))} (Stock: {product.stock}, Total Sales: {formatPrice(product.totalSales.toFixed(2))})
                        </li>
                    ))}
                </ul>
            </div>
            <div className="sales_chart">
                <h3>Sales Chart</h3>
                <div style={{ maxHeight: '400px' }}>
                    <Bar data={salesChartData} options={salesChartOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
