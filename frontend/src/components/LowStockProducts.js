import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import '../assets/styles/LowStockProducts.css'; // Optional: for styling

const LowStockProducts = () => {
    const [lowStockProducts, setLowStockProducts] = useState([]);

    useEffect(() => {
        const fetchLowStockProducts = async () => {
            try {
                const products = await getProducts();
                const filteredProducts = products.filter(product => product.stock <= 5);
                setLowStockProducts(filteredProducts);
            } catch (error) {
                console.error("Failed to fetch low stock products:", error);
            }
        };

        fetchLowStockProducts();
    }, []);

    return (
        <div className="low-stock-products">
            <h2>Low Stock Products</h2>
            {lowStockProducts.length > 0 ? (
                <table className="low-stock-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Barcode</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Expiry Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowStockProducts.map(product => (
                            <tr key={product.barcode}>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.barcode}</td>
                                <td>{product.category}</td>
                                <td>${product.price.toFixed(2)}</td>
                                <td>{product.stock}</td>
                                <td>{product.expiryDate ? new Date(product.expiryDate).toLocaleDateString() : 'N/A'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products with low stock.</p>
            )}
        </div>
    );
};

export default LowStockProducts;
