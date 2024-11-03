import React, { useEffect, useState } from 'react';
import '../assets/styles/OrderHistory.css';
import { formatPrice } from '../utils/formatPrice';
import { formatDate } from '../utils/formatDate';
import { getAllOrders } from '../api/orderApi'; // Import your API function

const OrderHistory = () => {
    const [orders, setOrders] = useState([]); // State to hold the fetched orders
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error state

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders();
                if (response.success) {
                    setOrders(response.orders); // Set the fetched orders to state
                } else {
                    throw new Error('Failed to fetch orders');
                }
            } catch (error) {
                setError('Failed to fetch orders.'); // Handle errors
            } finally {
                setLoading(false); // Stop loading regardless of success or failure
            }
        };

        fetchOrders(); // Call the fetch function
    }, []); // Empty dependency array to run on component mount

    if (loading) {
        return <p>Loading...</p>; // Loading state
    }

    if (error) {
        return <p>{error}</p>; // Error state
    }

    return (
        <div className="order-history">
            <h2>Order History</h2>
            {orders.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Total Quantity</th>
                            <th>Payment Mode</th>
                            <th>Sold date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <ul>
                                        {order.productname.map((name, index) => (
                                            <li key={order.productbarcode[index]}>
                                                {name} (x{order.productquantity[index]}) - {formatPrice(order.productprice[index])}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{formatPrice(order.totalPrice)}</td>
                                <td>{order.totalQuantity}</td>
                                <td className='payement_mode'>{order.paymentmode}</td>
                                <td>{formatDate(order.orderdate)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No orders found.</p>
            )}
        </div>
    );
};

export default OrderHistory;
