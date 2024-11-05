import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    getTotalOrdersToday,
    getTotalOrdersYesterday,
    getTotalOrdersLastWeek,
    getTotalOrdersLastMonth,
    getTotalOrdersLastYear,
    getTotalOrdersByDate,
} from '../api/orderApi'; // Ensure you import your API functions

const FilteredOrders = () => {
    const { filter } = useParams(); // This will hold the filter value (e.g., 'today', 'yesterday', etc.)
    const [orders, setOrders] = useState([]);
    const [customDate, setCustomDate] = useState('');

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
                        // Handle custom date filter here
                        response = await getTotalOrdersByDate(customDate);
                        break;
                    default:
                        // If the filter is a specific date
                        response = await getTotalOrdersByDate(filter); // filter will hold the date like '2024-11-03'
                }

                // Check if orders exist in the response
                if (response && response.orders) {
                    setOrders(response.orders);
                } else {
                    setOrders([]); // If no orders found, reset state
                }
            } catch (error) {
                console.error("Error fetching filtered orders:", error);
            }
        };

        fetchOrders(); // Call fetchOrders on component mount or filter change
    }, [filter, customDate]); // Adding customDate to dependencies if you want to re-fetch

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

    return (
        <div className="filtered-orders">
            <h2>Filtered Orders</h2>
            {filter === 'custom' && (
                <div>
                    <input
                        type="date"
                        value={customDate}
                        onChange={handleCustomDateChange}
                        required
                    />
                    <button onClick={handleFilterByDate}>Filter by Date</button>
                </div>
            )}
            <ul>
                {orders.length > 0 ? (
                    orders.map(order => (
                        <li key={order._id}>
                            Order ID: {order._id}, Total Price: {order.totalPrice}, Date: {order.orderDate}
                        </li>
                    ))
                ) : (
                    <p>No orders found for this filter.</p>
                )}
            </ul>
        </div>
    );
};

export default FilteredOrders;
