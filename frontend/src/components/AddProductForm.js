import React, { useState } from 'react';
import { addProduct } from '../api/productApi';
import '../assets/styles/AddProductForm.css'; // Import the CSS file

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [barcode, setBarcode] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [expiryDate, setExpiryDate] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const product = { name, barcode, price, stock, category, brand, expiryDate };
        await addProduct(product);
        // Reset the form
        setName('');
        setBarcode('');
        setPrice('');
        setStock('');
        setCategory('');
        setBrand('');
        setExpiryDate('');
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} required />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
            <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
            <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
            <input type="date" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
