import React, { useState } from 'react';
import { getProduct } from '../api/productApi';
import OrderSubmit from './OrderSubmit'; 
import '../assets/styles/PurchaseManager.css';
import { formatPrice } from '../utils/formatPrice';

const PurchaseManager = () => {
    const [barcode, setBarcode] = useState('');
    const [cart, setCart] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('cash'); 
    const [cashAmount, setCashAmount] = useState(0);
    const [upiAmount, setUpiAmount] = useState(0);
    const [cardAmount, setCardAmount] = useState(0);
    const [isSplitPayment, setIsSplitPayment] = useState(false);
    const [orderSubmitted, setOrderSubmitted] = useState(false);

    const handleAddToCart = async () => {
        try {
            const product = await getProduct(barcode);
            if (product) {
                setCart(prevCart => {
                    const existingItem = prevCart.find(item => item.barcode === barcode);
                    let updatedCart;
                    if (existingItem) {
                        existingItem.quantity += 1;
                        updatedCart = [...prevCart];
                    } else {
                        updatedCart = [...prevCart, { ...product, quantity: 1 }];
                    }
                    return updatedCart;
                });
                setBarcode('');
            } else {
                alert("Product not found!");
            }
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    const handleRemoveFromCart = (barcode) => {
        setCart(cart.filter(item => item.barcode !== barcode));
    };

    const updateQuantity = (barcode, delta) => {
        setCart(cart.map(item => {
            if (item.barcode === barcode) {
                const newQuantity = item.quantity + delta;
                return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
            }
            return item;
        }));
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const calculateTotalQuantity = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setIsSplitPayment(method === 'split');
    };

    const handleOrderSubmit = () => {
        const totalSplitAmount = cashAmount + upiAmount + cardAmount;
        const totalPrice = calculateTotalPrice();
        if (isSplitPayment && totalSplitAmount !== totalPrice) {
            alert("Total of cash, UPI, and card amounts must match the total price.");
            return;
        }
        setOrderSubmitted(true); // Set to true once order is submitted
    };

    const totalPrice = calculateTotalPrice();
    const totalQuantity = calculateTotalQuantity();

    return (
        <div className="purchase-manager">
            <h2>Purchase Manager</h2>
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
                <h4>Total Quantity: {totalQuantity}</h4>
                <h4 className='total_price'>Total Price: {formatPrice(totalPrice)}</h4>
                <div className="payment-method">
                    <h4>Select Payment Method :</h4>
                    <div className='method'>
                        <label htmlFor='cash'>
                            <input
                                type="radio"
                                value="cash"
                                id='cash'
                                checked={paymentMethod === 'cash'}
                                onChange={() => handlePaymentMethodChange('cash')}
                            />
                            Cash
                        </label>
                    </div>
                    <div className='method'>
                        <label htmlFor='upi'>
                            <input
                                type="radio"
                                value="upi"
                                id='upi'
                                checked={paymentMethod === 'upi'}
                                onChange={() => handlePaymentMethodChange('upi')}
                            />
                            UPI
                        </label>
                    </div>
                    <div className='method'>
                        <label htmlFor='card'>
                            <input
                                type="radio"
                                value="card"
                                id='card'
                                checked={paymentMethod === 'card'}
                                onChange={() => handlePaymentMethodChange('card')}
                            />
                            Card
                        </label>
                    </div>
                    <div className='method'>
                        <label htmlFor='split'>
                            <input
                                type="radio"
                                value="split"
                                id='split'
                                checked={paymentMethod === 'split'}
                                onChange={() => handlePaymentMethodChange('split')}
                            />
                            Split Payment
                        </label>
                    </div>

                    {isSplitPayment && (
                        <div>
                            <label>Cash Amount: </label>
                            <input type="number" value={cashAmount} onChange={(e) => setCashAmount(Number(e.target.value))} />
                            <label>UPI Amount: </label>
                            <input type="number" value={upiAmount} onChange={(e) => setUpiAmount(Number(e.target.value))} />
                            <label>Card Amount: </label>
                            <input type="number" value={cardAmount} onChange={(e) => setCardAmount(Number(e.target.value))} />
                        </div>
                    )}
                </div>
                
                <button onClick={handleOrderSubmit}>Submit Order</button>
                
                <OrderSubmit
                    cart={cart} 
                    paymentMethod={paymentMethod} 
                    totalPrice={totalPrice}
                    totalQuantity={totalQuantity}
                    cashAmount={cashAmount}
                    upiAmount={upiAmount}
                    cardAmount={cardAmount}
                    setCart={setCart} 
                    orderSubmitted={orderSubmitted}
                />
            </div>
        </div>
    );
};

export default PurchaseManager;
