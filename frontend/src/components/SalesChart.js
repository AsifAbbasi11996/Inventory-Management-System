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
            fill: true,
            backgroundColor: (context) => {
                const chart = context.chart;
                const { ctx, chartArea } = chart;
                if (!chartArea) {
                    // This case happens on initial chart render.
                    return null;
                }
                const gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, chartArea.top);
                gradient.addColorStop(0, 'rgba(54, 162, 235, 0.2)');
                gradient.addColorStop(1, 'rgba(54, 162, 235, 0.7)');
                return gradient;
            },
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 3,
            pointRadius: 6,
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverRadius: 8,
            tension: 0.5, // Smooth the line further
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
                    padding: {
                        top: 10,
                        bottom: 10,
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
                    padding: {
                        top: 10,
                    },
                },
            },
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#333',
                    font: {
                        size: 14,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#fff',
                titleFont: { size: 14 },
                bodyFont: { size: 12 },
                padding: 12,
                cornerRadius: 10,
                displayColors: false,
            },
        },
        animation: {
            duration: 1000,
            easing: 'easeInOutQuart',
        },
        elements: {
            line: {
                borderWidth: 2,
                borderColor: 'rgba(54, 162, 235, 0.8)',
                borderDash: [5, 5],
            },
        },
    };

    return (
        <div className="sales_chart">
            <h3 style={{ color: '#333', textAlign: 'center', marginBottom: '20px' }}>Sales Chart</h3>
            <div style={{ minHeight: '400px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '8px', padding: '20px', backgroundColor: '#f9f9f9' }}>
                <Line data={chartData} options={chartOptions} />
            </div>
        </div>
    );
};

export default SalesChart;
