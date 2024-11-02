import React from 'react';
import '../assets/styles/OrderHistory.css';
import { formatPrice } from '../utils/formatPrice';
import { formatDate } from '../utils/formatDate';

const sampleOrders = [
    {
        id: 'ORD001',
        date: '2024-10-30',
        items: [
            { name: 'Product A', quantity: 2 },
            { name: 'Product B', quantity: 1 },
        ],
        totalPrice: 25.99,
        status: 'Completed',
    },
    {
        id: 'ORD002',
        date: '2024-10-25',
        items: [
            { name: 'Product C', quantity: 1 },
            { name: 'Product D', quantity: 3 },
        ],
        totalPrice: 45.50,
        status: 'Pending',
    },
    {
        id: 'ORD003',
        date: '2024-10-15',
        items: [
            { name: 'Product E', quantity: 5 },
        ],
        totalPrice: 75.00,
        status: 'Shipped',
    },
];

const OrderHistory = () => {
    return (
        <div className="order-history">
            <h2>Order History</h2>
            {sampleOrders.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Items</th>
                            <th>Total Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleOrders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{formatDate(order.date)}</td>
                                <td>
                                    <ul>
                                        {order.items.map(item => (
                                            <li key={item.name}>{item.name} (x{item.quantity})</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>{formatPrice(order.totalPrice)}</td>
                                <td>{order.status}</td>
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
