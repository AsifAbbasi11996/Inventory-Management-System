import React, { useState } from 'react';
import '../assets/styles/Reports.css'; // Make sure to create this CSS file

const Reports = () => {
    const [reportType, setReportType] = useState('sales'); // Default report type
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [reportData, setReportData] = useState(null); // Placeholder for report data

    const handleGenerateReport = () => {
        // Placeholder logic for report generation based on reportType
        // In a real application, you'd fetch data based on startDate, endDate, and reportType
        const dummyData = {
            sales: `Sales Report from ${startDate} to ${endDate}`,
            stock: `Stock Levels Report from ${startDate} to ${endDate}`,
            profitLoss: `Profit/Loss Report from ${startDate} to ${endDate}`,
        };
        setReportData(dummyData[reportType]);
    };

    return (
        <div className="reports">
            <h2>Generate Reports</h2>
            <div className="report-type-selector">
                <label>
                    <input
                        type="radio"
                        value="sales"
                        checked={reportType === 'sales'}
                        onChange={(e) => setReportType(e.target.value)}
                    />
                    Sales
                </label>
                <label>
                    <input
                        type="radio"
                        value="stock"
                        checked={reportType === 'stock'}
                        onChange={(e) => setReportType(e.target.value)}
                    />
                    Stock Levels
                </label>
                <label>
                    <input
                        type="radio"
                        value="profitLoss"
                        checked={reportType === 'profitLoss'}
                        onChange={(e) => setReportType(e.target.value)}
                    />
                    Profit/Loss
                </label>
            </div>
            <div className="date-range">
                <label>
                    Start Date:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    End Date:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleGenerateReport}>Generate Report</button>

            {reportData && (
                <div className="report-results">
                    <h3>{reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report</h3>
                    <p>{reportData}</p>
                </div>
            )}
        </div>
    );
};

export default Reports;
