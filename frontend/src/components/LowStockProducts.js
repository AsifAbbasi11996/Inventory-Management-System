import React, { useEffect, useState } from 'react';
import { getAllProducts, updateProduct, deleteProduct } from '../api/productApi';
import { MdEdit, MdDelete } from "react-icons/md";
import '../assets/styles/LowStockProducts.css';
import { formatDate } from '../utils/formatDate';
import EditProduct from './EditProduct';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { formatPrice } from '../utils/formatPrice';

const LowStockProducts = () => {
    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedBarcode, setSelectedBarcode] = useState('');

    // Fetch low stock products
    useEffect(() => {
        const fetchLowStockProducts = async () => {
            try {
                const products = await getAllProducts();
                const filteredProducts = products.filter(product => product.stock < 6);
                
                // Sort products by stock in ascending order
                const sortedProducts = filteredProducts.sort((a, b) => a.stock - b.stock);
                setLowStockProducts(sortedProducts);
            } catch (error) {
                console.error("Failed to fetch low stock products:", error);
            }
        };
        fetchLowStockProducts();
    }, []);

    // Edit handler
    const handleEditClick = (product) => {
        setSelectedProduct(product);
        setIsEditModalOpen(true);
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedProduct(null);
    };

    const handleProductUpdate = async (updatedProduct) => {
        try {
            await updateProduct(updatedProduct.barcode, updatedProduct);
            setLowStockProducts((prevProducts) =>
                prevProducts.map(product =>
                    product.barcode === updatedProduct.barcode ? updatedProduct : product
                )
            );
            handleModalClose();
        } catch (error) {
            console.error("Failed to update product:", error);
        }
    };

    // Delete handlers
    const handleDeleteClick = (product) => {
        setSelectedBarcode(product.barcode); // Set the barcode for deletion
        setSelectedProduct(product); // Set the selected product for modal display
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await deleteProduct(selectedBarcode);
            setLowStockProducts(prevProducts =>
                prevProducts.filter(product => product.barcode !== selectedBarcode)
            );
            setIsDeleteModalOpen(false);
            setSelectedBarcode('');
            setSelectedProduct(null); // Clear selected product
        } catch (error) {
            console.error("Failed to delete product:", error);
        }
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedBarcode('');
        setSelectedProduct(null); // Clear selected product
    };

    return (
        <div className="low-stock-products">
            <h2>Low Stock Products</h2>
            {lowStockProducts.length > 0 ? (
                <table className="low-stock-table">
                    <thead>
                        <tr>
                            <th>Sr no.</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Barcode</th>
                            <th>Category</th>
                            <th>Type</th>
                            <th>Size</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Expiry Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lowStockProducts.map((product, index) => (
                            <tr key={product.barcode}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.brand}</td>
                                <td>{product.barcode}</td>
                                <td>{product.category}</td>
                                <td>{product.type}</td>
                                <td className='size'>{product.size}</td>
                                <td>{formatPrice(product.price.toFixed(2))}</td>
                                <td>{product.stock}</td>
                                <td>{formatDate(product.expiryDate)}</td>
                                <td className="actions">
                                    <button onClick={() => handleEditClick(product)} className="edit">
                                        <MdEdit /> Edit
                                    </button>
                                    <button onClick={() => handleDeleteClick(product)} className="delete">
                                        <MdDelete /> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products with low stock.</p>
            )}

            {/* Edit Modal */}
            {isEditModalOpen && (
                <EditProduct
                    isOpen={isEditModalOpen}
                    onClose={handleModalClose}
                    product={selectedProduct}
                    onSave={handleProductUpdate}
                />
            )}

            {/* Delete Confirmation Modal */}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onDelete={handleDeleteConfirm}
                productName={selectedProduct ? selectedProduct.name : 'this product'}
            />
        </div>
    );
};

export default LowStockProducts;
