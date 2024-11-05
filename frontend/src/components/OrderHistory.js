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
                console.log(response); // Log response to inspect structure
                
                if (response) { // Adjusted condition based on your API response
                    setOrders(response);
                } else {
                    throw new Error('Failed to fetch orders');
                }
            } catch (error) {
                console.error(error); // Log error for debugging
                setError('Failed to fetch orders.');
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrders();
    }, []);
    

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
                            <th>Sold Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <ul>
                                        {order.productname.map((name, i) => (
                                            <li key={order.productbarcode[i]}>
                                                {name} - (x{order.productquantity[i]}) - {formatPrice(order.productprice[i])}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{formatPrice(order.totalPrice)}</td>
                                <td>{order.totalQuantity}</td>
                                <td className='payment_mode'>{order.paymentmode}</td>
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
