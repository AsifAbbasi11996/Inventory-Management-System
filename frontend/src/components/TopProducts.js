import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../api/productApi.js';
import { formatPrice } from '../utils/formatPrice.js';
import '../assets/styles/TopProducts.css';

const TopProducts = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [rows, setRows] = useState(10);
    const [categoryFilter, setCategoryFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getAllProducts();
                setProducts(data);
                setFilteredProducts(data); 
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        let filtered = products;

        if (categoryFilter) {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        if (searchTerm) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.barcode.includes(searchTerm)
            );
        }

        setFilteredProducts(filtered);
        setPage(1);  // Reset to the first page whenever filters change
    }, [categoryFilter, searchTerm, products]);

    const handleRowsChange = (e) => setRows(parseInt(e.target.value));
    const handleCategoryChange = (e) => setCategoryFilter(e.target.value);
    const handleSearchChange = (e) => setSearchTerm(e.target.value);
    const handlePageChange = (pageNum) => setPage(pageNum);

    const paginatedProducts = filteredProducts.slice((page - 1) * rows, page * rows);
    const totalPages = Math.ceil(filteredProducts.length / rows);

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="top-products-container">
            <h2 className="title">Best Selling Products</h2>

            <div className="filters">
                <div className="rows">
                    <label>Items by rows</label>
                    <select value={rows} onChange={handleRowsChange}>
                        <option value={10}>10 items</option>
                        <option value={20}>20 items</option>
                        <option value={30}>30 items</option>
                    </select>
                </div>
                <div className="category">
                    <label>Category</label>
                    <select value={categoryFilter} onChange={handleCategoryChange}>
                        <option value="">All Categories</option>
                        {Array.from(new Set(products.map(product => product.category))).map(category => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
                <div className="search_product">
                    <label>Search Product</label>
                    <input
                        type="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Search by name, brand, or barcode"
                    />
                </div>
            </div>

            <table className="product-table">
                <thead>
                    <tr>
                        <th>Sr. No</th>
                        <th>Name</th>
                        <th>Barcode</th>
                        <th>MRP</th>
                        <th>SP</th>
                        <th>Category</th>
                        <th>Brand</th>
                        <th>Size</th>
                        <th>Type</th>
                        <th>Stock</th>
                        <th>Orders</th>
                        <th>Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedProducts.map((product, index) => (
                        <tr key={product.barcode}>
                            <td>{(page - 1) * rows + index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.barcode}</td>
                            <td>{formatPrice(product.mrp.toFixed(2))}</td>
                            <td>{formatPrice(product.price.toFixed(2))}</td>
                            <td>{product.category}</td>
                            <td>{product.brand}</td>
                            <td>{product.size}</td>
                            <td>{product.type}</td>
                            <td>{product.stock}</td>
                            <td>{product.orderCount}</td>
                            <td>{formatPrice(product.sales)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <div className="result-info">
                    Showing {paginatedProducts.length} of {filteredProducts.length} results
                </div>
                <div className="page-controls">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                        <button
                            key={num}
                            onClick={() => handlePageChange(num)}
                            className={page === num ? 'active' : ''}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopProducts;
