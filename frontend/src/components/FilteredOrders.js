import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import {
    getTotalOrdersToday,
    getTotalOrdersYesterday,
    getTotalOrdersLastWeek,
    getTotalOrdersLastMonth,
    getTotalOrdersLastYear,
    getTotalOrdersByDate,
} from '../api/orderApi';
import { formatPrice } from '../utils/formatPrice';
import { formatDate } from '../utils/formatDate';
import '../assets/styles/FilteredOrders.css';

const FilteredOrders = () => {
    const { filter } = useParams(); // This will hold the filter value (e.g., 'today', 'yesterday', etc.)
    const navigate = useNavigate(); // Use navigate hook instead of history
    const [orders, setOrders] = useState([]);
    const [customDate, setCustomDate] = useState('');
    const [filterLabel, setFilterLabel] = useState('');
    const [rows, setRows] = useState(15); // Number of orders per page
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination

    // Helper function to get the filter label for the UI
    const getFilterLabel = () => {
        switch (filter) {
            case 'today':
                return 'Today\'s Orders';
            case 'yesterday':
                return 'Yesterday\'s Orders';
            case 'lastWeek':
                return 'Last Week\'s Orders';
            case 'lastMonth':
                return 'Last Month\'s Orders';
            case 'lastYear':
                return 'Last Year\'s Orders';
            case 'custom':
                return customDate ? `Orders for ${customDate}` : 'Custom Date Filter';
            default:
                return filter ? `Orders for ${filter}` : 'All Orders';
        }
    };

    // Fetch the orders based on the filter
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                let response;
                switch (filter) {
                    case 'today':
                        response = await getTotalOrdersToday();
                        break;
                    case 'yesterday':
                        response = await getTotalOrdersYesterday();
                        break;
                    case 'lastWeek':
                        response = await getTotalOrdersLastWeek();
                        break;
                    case 'lastMonth':
                        response = await getTotalOrdersLastMonth();
                        break;
                    case 'lastYear':
                        response = await getTotalOrdersLastYear();
                        break;
                    case 'custom':
                        response = await getTotalOrdersByDate(customDate);
                        break;
                    default:
                        response = await getTotalOrdersByDate(filter); // for a specific date like '2024-11-03'
                }

                // Check if orders exist in the response
                if (response && response.orders) {
                    setOrders(response.orders);
                } else {
                    setOrders([]); // If no orders found, reset state
                }

                // Update the filter label
                setFilterLabel(getFilterLabel());

            } catch (error) {
                console.error("Error fetching filtered orders:", error);
            }
        };

        fetchOrders();
    }, [filter, customDate]); // Dependencies: filter and customDate

    // Handle custom date input change
    const handleCustomDateChange = (e) => {
        setCustomDate(e.target.value);
    };

    const handleFilterByDate = async () => {
        if (customDate) {
            try {
                const response = await getTotalOrdersByDate(customDate);
                if (response && response.orders) {
                    setOrders(response.orders);
                } else {
                    setOrders([]); // If no orders found, reset state
                }
            } catch (error) {
                console.error("Error fetching orders by custom date:", error);
            }
        }
    };

    // Handle the change of filter selection (dropdown)
    const handleFilterChange = (newFilter) => {
        if (newFilter === 'custom') {
            // For 'custom' filter, stay on the current page and allow custom date input
            navigate(`/filtered-orders/custom`);
        } else {
            navigate(`/filtered-orders/${newFilter}`);
        }
    };

    // Handle rows per page change
    const handleRowsChange = (e) => {
        setRows(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset to first page when rows change
    };

    // Pagination logic
    const startIndex = (currentPage - 1) * rows;
    const paginatedOrders = orders.slice(startIndex, startIndex + rows);

    // Calculate total pages
    const totalPages = Math.ceil(orders.length / rows);

    // Handle page change
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="filtered-orders">
            <h2>Filtered Orders</h2>

            <div className="filter-indicator">
                <strong>Viewing : </strong>{filterLabel}
            </div>

            <div className='filters'>
                <div className='rows flex'>
                    <label>Orders by rows</label>
                    <select value={rows} onChange={handleRowsChange}>
                        <option value={15}>15 orders</option>
                        <option value={25}>25 orders</option>
                        <option value={50}>50 orders</option>
                    </select>
                </div>
                <div className="filter-control flex">
                    <label>Filter by </label>
                    <select
                        value={filter}
                        onChange={(e) => handleFilterChange(e.target.value)}
                    >
                        <option value="today">Today</option>
                        <option value="yesterday">Yesterday</option>
                        <option value="lastWeek">Last Week</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="lastYear">Last Year</option>
                        <option value="custom">Custom Date</option>
                    </select>
                </div>

                {filter === 'custom' && (
                    <div className='custom flex'>
                        <input
                            type="date"
                            value={customDate}
                            onChange={handleCustomDateChange}
                            required
                        />
                        <button onClick={handleFilterByDate}>Filter by Date</button>
                    </div>
                )}
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Sr. no</th>
                        <th>Product Name</th>
                        {/* <th>Product Barcode</th> */}
                        <th>Product Brand</th>
                        <th>Product Type</th>
                        <th>Product Size</th>
                        <th>Product Price</th>
                        <th>Product Quantity</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedOrders.length > 0 ? (
                        paginatedOrders.reduce((acc, order) => {
                            return [
                                ...acc,
                                ...order.productname.map((name, index) => ({
                                    srNo: acc.length + index + 1,
                                    name,
                                    // barcode: order.productbarcode[index],
                                    brand: order.productbrand[index],
                                    type: order.productType[index],
                                    size: order.productsize[index],
                                    price: formatPrice(order.productprice[index]),
                                    quantity: order.productquantity[index],
                                    orderDate: formatDate(order.orderdate),
                                })),
                            ];
                        }, []).map((row) => (
                            <tr key={row.srNo}>
                                <td>{row.srNo}</td>
                                <td>{row.name}</td>
                                {/* <td>{row.barcode}</td> */}
                                <td>{row.brand}</td>
                                <td>{row.type}</td>
                                <td className="size">{row.size}</td>
                                <td>{row.price}</td>
                                <td>{row.quantity}</td>
                                <td>{row.orderDate}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="10">No orders found for this filter.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default FilteredOrders;
