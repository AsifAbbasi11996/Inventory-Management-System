import React, { useEffect, useState } from 'react';
import Dashboard from '../components/Dashboard';
import SalesChart from '../components/SalesChart';
import TopProducts from '../components/TopProducts';
import { getAllProducts } from '../api/productApi';
import '../assets/styles/DashboardPage.css';

const DashboardPage = () => {
    const [totalCategories, setTotalCategories] = useState(0);
    const [lowStockCount, setLowStockCount] = useState(0);
    const [topSellingProducts, setTopSellingProducts] = useState([]);
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const products = await getAllProducts();

            // Unique categories
            const categories = new Set(products.map(product => product.category));
            setTotalCategories(categories.size);

            // Low stock count
            const lowStock = products.filter(product => product.stock < 6);
            setLowStockCount(lowStock.length);

            // Top-selling products based on sales
            const sortedProducts = [...products]
                .sort((a, b) => b.sales - a.sales)
                .slice(0, 10); // Get top 10 products for chart

            setTopSellingProducts(sortedProducts);

            // Prepare sales data for chart
            const salesDataArray = sortedProducts.map(product => ({
                name: product.name,
                totalSales: product.sales,
            }));
            setSalesData(salesDataArray);
        };

        fetchData();
    }, []);


    return (
        <div className="dashboard-page">
            <Dashboard
                totalCategories={totalCategories}
                lowStockCount={lowStockCount}
                topSellingProducts={topSellingProducts}
            />

            <hr/>

            <SalesChart salesData={salesData} />

            <hr/>
            <TopProducts />


        </div>
    );
};

export default DashboardPage;
