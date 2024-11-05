import React, { useState } from 'react';
import '../assets/styles/ProductTable.css';
import { MdEdit, MdDelete } from "react-icons/md";
import { formatPrice } from '../utils/formatPrice.js';
import { updateProduct } from '../api/productApi.js';
import EditProduct from './EditProduct';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const ProductTable = ({ products, onDelete, setProducts }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBarcode, setSelectedBarcode] = useState('');

    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    const handleSave = async (updatedProduct) => {
        try {
            await updateProduct(updatedProduct.barcode, updatedProduct);
            setProducts((prevProducts) =>
                prevProducts.map((product) =>
                    product.barcode === updatedProduct.barcode ? updatedProduct : product
                )
            );
            handleModalClose();
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    const handleDeleteClick = (product) => {
        setSelectedProduct(product); // Set the selected product for modal display
        setSelectedBarcode(product.barcode);
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(selectedBarcode);
        setIsDeleteModalOpen(false);
        setSelectedProduct(null); // Clear selected product after deletion
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedBarcode('');
        setSelectedProduct(null); // Clear selected product
    };

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
                                <th>Type</th>
                                <th>Size</th>
                                <th>MRP</th>
                                <th>SP</th>
                                <th>Stock</th>
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
                                    <td>{product.type}</td>
                                    <td className='size'>{product.size}</td>
                                    <td>{formatPrice(product.mrp.toFixed(2))}</td>
                                    <td>{formatPrice(product.price.toFixed(2))}</td>
                                    <td>{product.stock}</td>
                                    <td className='actions'>
                                        <button onClick={() => handleEditClick(product)} className='edit'>
                                            <MdEdit /> Edit
                                        </button>
                                        <button onClick={() => handleDeleteClick(product)} className='delete'>
                                            <MdDelete/> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products available</p>
                )}
            </div>
            {selectedProduct && (
                <EditProduct
                    isOpen={isEditModalOpen}
                    onClose={handleModalClose}
                    product={selectedProduct}
                    onSave={handleSave}
                />
            )}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onDelete={handleDeleteConfirm}
                name={selectedProduct ? selectedProduct.name : 'this product'}
            />
        </>
    );
};

export default ProductTable;