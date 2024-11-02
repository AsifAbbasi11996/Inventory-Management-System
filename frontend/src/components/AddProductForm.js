import React, { useState } from 'react';
import { addProduct } from '../api/productApi';
import '../assets/styles/AddProductForm.css';
import { AiOutlineInfoCircle } from 'react-icons/ai';

const AddProductForm = () => {
    const [name, setName] = useState('');
    const [barcode, setBarcode] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [brand, setBrand] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!name) newErrors.name = 'Product name is required';
        if (!barcode) newErrors.barcode = 'Barcode is required';
        if (!price) newErrors.price = 'Price is required';
        if (!stock) newErrors.stock = 'Stock is required';
        if (!category) newErrors.category = 'Category is required';
        if (!type) newErrors.type = 'Type is required';
        if (!size) newErrors.size = 'Size is required';
        if (!brand) newErrors.brand = 'Brand is required';
        if (!expiryDate) newErrors.expiryDate = 'Expiry Date is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        const product = { name, barcode, price, stock, category, type, size, brand, expiryDate };
        await addProduct(product);

        // Reset the form
        setName('');
        setBarcode('');
        setPrice('');
        setStock('');
        setCategory('');
        setType('');
        setSize('');
        setBrand('');
        setExpiryDate('');
        setErrors({});
        setSuccessMessage('Product added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    return (
        <form className="add-product-form" onSubmit={handleSubmit}>
            <h2>Add New Product</h2>
            {successMessage && <div className="success-message">{successMessage}</div>}

            <div className="form-group">
                <input type="text" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} required />
                {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group tooltip">
                <input type="text" placeholder="Barcode" value={barcode} onChange={(e) => setBarcode(e.target.value)} required />
                <AiOutlineInfoCircle className="info-icon" />
                <span className="tooltip-text">Enter a unique barcode for the product</span>
                {errors.barcode && <span className="error-message">{errors.barcode}</span>}
            </div>

            <div className="form-group">
                <input type="text" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                {errors.brand && <span className="error-message">{errors.brand}</span>}
            </div>

            <div className="form-group">
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} required />
                {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-group">
                <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} required />
                {errors.type && <span className="error-message">{errors.type}</span>}
            </div>

            <div className='two'>
                <div className="form-group">
                    <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    {errors.price && <span className="error-message">{errors.price}</span>}
                </div>

                <div className="form-group">
                    <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(e.target.value)} required />
                    {errors.stock && <span className="error-message">{errors.stock}</span>}
                </div>
            </div>

            <div className="form-group">
                <input type="text" placeholder="Size" value={size} onChange={(e) => setSize(e.target.value)} required />
                {errors.size && <span className="error-message">{errors.size}</span>}
            </div>

            <div className="form-group">
                <input type="date" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} required />
                {errors.expiryDate && <span className="error-message">{errors.expiryDate}</span>}
            </div>

            <button type="submit">Add Product</button>
        </form>
    );
};

export default AddProductForm;
