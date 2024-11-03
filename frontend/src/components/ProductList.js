import React, { useEffect, useState } from 'react';
import { getAllProducts, deleteProduct } from '../api/productApi';
import ProductTable from './ProductTable';
import '../assets/styles/ProductList.css'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [rows, setRows] = useState(10);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

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
    }, [rows, categoryFilter, searchTerm, products]);

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

        setFilteredProducts(filtered.slice(0, rows)); // Limit number of rows displayed
    };

    const handleDelete = async (barcode) => {
        await deleteProduct(barcode);
        setProducts(products.filter((product) => product.barcode !== barcode));
    };

    const handleRowsChange = (event) => {
        setRows(parseInt(event.target.value, 10));
    };

    const handleCategoryChange = (event) => {
        setCategoryFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
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
            <ProductTable products={filteredProducts} setProducts={setProducts} onDelete={handleDelete} />
        </div>
    );
};

export default ProductList;
