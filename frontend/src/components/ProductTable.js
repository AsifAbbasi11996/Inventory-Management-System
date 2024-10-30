import React from 'react';
import '../assets/styles/ProductTable.css';
import { formatDate } from '../utils/formatDate';

const ProductTable = ({ products, onDelete }) => {
    return (
        <>
            <div className='products'>
                {products && products.length > 0 ? (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Sr. no</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Barcode</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Expiry Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product, index) => (
                                <tr key={product.barcode}>
                                    <td>{index + 1}</td>
                                    <td>{product.name}</td>
                                    <td>{product.brand}</td>
                                    <td>{product.barcode}</td>
                                    <td>{product.category}</td>
                                    <td>${product.price.toFixed(2)}</td>
                                    <td>{product.stock}</td>
                                    <td>{formatDate(product.expiryDate)}</td>
                                    <td>
                                        <button onClick={() => onDelete(product.barcode)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products available</p>
                )}
            </div>
        </>
    );
};

export default ProductTable;
