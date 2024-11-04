import React, { useEffect, useState } from 'react';
import { getAllRecentProducts } from '../api/productApi';
import '../assets/styles/AddProductForm.css'
import { formatPrice } from '../utils/formatPrice.js';

const NewProductAdded = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchRecentProducts = async () => {
            try {
                const response = await getAllRecentProducts(); // Fetch recent products
                setProducts(response);
            } catch (error) {
                console.error("Failed to fetch recent products:", error);
            }
        };
        
        fetchRecentProducts();
    }, []);

    return (
        <div className='recent_added_products'>
            <h2>Recently Added Products</h2>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Barcode</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Price</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product.name}</td>
                                <td>{product.barcode}</td>
                                <td>{product.brand}</td>
                                <td>{product.category}</td>
                                <td>{product.type}</td>
                                <td>{formatPrice(product.price.toFixed(2))}</td>
                                <td>{product.stock}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8">No recent products found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default NewProductAdded;
