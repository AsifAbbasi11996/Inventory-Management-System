import React, { useEffect, useState } from 'react';
import '../assets/styles/AllOrders.css';
import { getAllOrders } from '../api/orderApi'; // Adjust the import based on your file structure
import { formatPrice } from '../utils/formatPrice';
import { formatDate } from '../utils/formatDate';

const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders();
                if (response) {
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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="all-orders">
            <h2>All Orders</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sr. no</th>
                        <th>Product Name</th>
                        {/* <th>Barcode</th> */}
                        <th>Brand</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Payment Mode</th>
                        {/* <th>Total Price</th> */}
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.reduce((acc, order) => {
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
                                paymentMode: order.paymentmode,
                                // totalPrice: formatPrice(order.totalPrice),
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
                            <td className='size'>{row.size}</td>
                            <td>{row.price}</td>
                            <td>{row.quantity}</td>
                            <td>{row.paymentMode}</td>
                            {/* <td>{row.totalPrice}</td> */}
                            <td>{row.orderDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllOrders;
