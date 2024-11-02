import React, { useState, useEffect } from 'react';
import '../assets/styles/EditProduct.css';

const EditProduct = ({ isOpen, onClose, product, onSave }) => {
    const [editedProduct, setEditedProduct] = useState(product);

    useEffect(() => {
        setEditedProduct(product);
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedProduct);
        onClose(); // Close the modal after saving
    };

    // Function to format date to YYYY-MM-DD
    const formatDateToInput = (date) => {
        const formattedDate = new Date(date);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        isOpen && (
            <div className="modal-overlay">
                <div className="modal-content">
                    <h2>Edit Product</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={editedProduct.name}
                            onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            type="text"
                            value={editedProduct.brand}
                            onChange={(e) => setEditedProduct({ ...editedProduct, brand: e.target.value })}
                            placeholder="Brand"
                        />
                        <input
                            type="text"
                            value={editedProduct.barcode}
                            readOnly
                        />
                        <input
                            type="text"
                            value={editedProduct.category}
                            onChange={(e) => setEditedProduct({ ...editedProduct, category: e.target.value })}
                            placeholder="Category"
                        />
                        <input
                            type="text"
                            value={editedProduct.type}
                            onChange={(e) => setEditedProduct({ ...editedProduct, type: e.target.value })}
                            placeholder="Type"
                        />
                        <input
                            type="text"
                            value={editedProduct.size}
                            onChange={(e) => setEditedProduct({ ...editedProduct, size: e.target.value })}
                            placeholder="Size"
                        />
                        <input
                            type="number"
                            value={editedProduct.price}
                            onChange={(e) => setEditedProduct({ ...editedProduct, price: Number(e.target.value) })}
                            placeholder="Price"
                        />
                        <input
                            type="number"
                            value={editedProduct.stock}
                            onChange={(e) => setEditedProduct({ ...editedProduct, stock: Number(e.target.value) })}
                            placeholder="Stock"
                        />
                        <input
                            type="date"
                            value={formatDateToInput(editedProduct.expiryDate)} // Format date for input
                            onChange={(e) => setEditedProduct({ ...editedProduct, expiryDate: e.target.value })}
                        />
                        <div className='btns'>
                            <button type="submit">Save</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditProduct;
