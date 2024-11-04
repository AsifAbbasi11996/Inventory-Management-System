// SalesChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const SalesChart = ({ salesData }) => {
    // Only keep the top 10 sales data
    const topSalesData = salesData.slice(0, 10);

    const chartData = {
        labels: topSalesData.map(product => product.name),
        datasets: [{
            label: 'Total Sales ($)',
            data: topSalesData.map(product => product.totalSales),
            fill: false,
            borderColor: 'rgba(54, 162, 235, 0.8)',
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderWidth: 2,
            pointRadius: 4,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            tension: 0.4, // Smooth the line
        }],
    };

    const chartOptions = {
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
                display: true,
                position: 'top',
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

    return (
        <div className="sales_chart">
            <h3>Sales Chart</h3>
            <div style={{ minHeight: '400px' }}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default SalesChart;
