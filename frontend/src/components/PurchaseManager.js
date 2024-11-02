import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productApi';
import Scanner from './BarcodeScanner'; 
import '../assets/styles/PurchaseManager.css';
import { formatPrice } from '../utils/formatPrice';

const PurchaseManager = () => {
    const [products, setProducts] = useState([]);
    const [barcode, setBarcode] = useState('');
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                setProducts(response);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleAddToCart = () => {
        const product = products.find(p => p.barcode === barcode);
        if (product) {
            setCart(prevCart => {
                const existingItem = prevCart.find(item => item.barcode === barcode);
                if (existingItem) {
                    existingItem.quantity += 1; // Increment existing item's quantity
                    return [...prevCart];
                } else {
                    return [...prevCart, { ...product, quantity: 1 }]; // Add new item to cart
                }
            });
            setBarcode('');
        } else {
            alert("Product not found!");
        }
    };

    const handleScan = (scannedBarcode) => {
        setBarcode(scannedBarcode);
        handleAddToCart(); // Automatically add to cart on scan
    };

    const handleRemoveFromCart = (barcode) => {
        setCart(cart.filter(item => item.barcode !== barcode));
    };

    const updateQuantity = (barcode, delta) => {
        setCart(cart.map(item => {
            if (item.barcode === barcode) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 }; // Ensure quantity doesn't go below 1
            }
            return item;
        }));
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <div className="purchase-manager">
            <h2>Purchase Manager</h2>
            <Scanner onScan={handleScan} /> 
            <div className="input-container">
                <input
                    type="text"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    placeholder="Enter product barcode or scan"
                />
                <button onClick={handleAddToCart}>Add Item</button>
            </div>
            <div className="cart">
                <h3>Cart</h3>
                {cart.length > 0 ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Sr no.</th>
                                <th>Name</th>
                                <th>Brand</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Size</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={item.barcode}>
                                    <td>{index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.category}</td>
                                    <td>{item.type}</td>
                                    <td className='size'>{item.size}</td>
                                    <td>{formatPrice(item.price.toFixed(2))}</td>
                                    <td>
                                        <button onClick={() => updateQuantity(item.barcode, -1)}>-</button>
                                        {item.quantity}
                                        <button onClick={() => updateQuantity(item.barcode, 1)}>+</button>
                                    </td>
                                    <td>{formatPrice((item.price * item.quantity).toFixed(2))}</td>
                                    <td>
                                        <button onClick={() => handleRemoveFromCart(item.barcode)} className='remove'>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No items in the cart.</p>
                )}
                <h4>Total Price: {formatPrice(calculateTotalPrice())}</h4>
                <button className="payment-button">Proceed to Payment</button>
            </div>
        </div>
    );
};

export default PurchaseManager;
