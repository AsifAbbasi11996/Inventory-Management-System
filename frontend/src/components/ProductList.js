import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../api/productApi';
import ProductTable from './ProductTable';
import '../assets/styles/ProductList.css';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [rows, setRows] = useState(10); // Number of products per page
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1); // Current page for pagination

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response);
                setFilteredProducts(response); // Initialize filtered products
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [rows, categoryFilter, searchTerm, products, currentPage]);

    const applyFilters = () => {
        let filtered = [...products];

        // Filter by category
        if (categoryFilter) {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        // Filter by search term (name, brand, barcode)
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.barcode.includes(searchTerm)
            );
        }

        setFilteredProducts(filtered);
    };

    const handleDelete = async (barcode) => {
        await deleteProduct(barcode);
        setProducts(products.filter((product) => product.barcode !== barcode));
    };

    const handleRowsChange = (event) => {
        setRows(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to first page when rows per page change
    };

    const handleCategoryChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to first page when search term changes
    };

    // Pagination Logic
    const totalPages = Math.ceil(filteredProducts.length / rows);
    const startIndex = (currentPage - 1) * rows;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + rows);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className='product-list_container'>
            <h2>Products List</h2>
            <div className='filters'>
                <div className='rows'>
                    <label>Items by rows</label>
                    <select value={rows} onChange={handleRowsChange}>
                        <option value={10}>10 items</option>
                        <option value={20}>20 items</option>
                        <option value={30}>30 items</option>
                    </select>
                </div>
                <div className='category'>
                    <label>Category</label>
                    <select value={categoryFilter} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {Array.from(new Set(products.map(product => product.category)))
                            .map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                    </select>
                </div>
                <div className='search_product'>
                    <label>Search Product</label>
                    <input
                        type='search'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder='Search by name, brand, or barcode'
                    />
                </div>
            </div>

            <ProductTable products={paginatedProducts} setProducts={setProducts} onDelete={handleDelete} />

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Dynamically generate page buttons */}
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? 'active' : ''}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductList;
