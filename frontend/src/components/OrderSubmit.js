import React from 'react';
import { createOrder } from '../api/orderApi'; 

const OrderSubmit = ({ cart, paymentMethod, totalPrice, totalQuantity, setCart, cashAmount, upiAmount, cardAmount, orderSubmitted }) => {
    const handleSubmitOrder = async () => {
        if (!orderSubmitted) {
            alert("Click on 'Submit Order' to finish your payment and store the data.");
            return;
        }

        const orderData = {
            productname: cart.map(item => item.name),
            productbarcode: cart.map(item => item.barcode),
            productbrand: cart.map(item => item.brand),
            productType: cart.map(item => item.type),
            productsize: cart.map(item => item.size),
            productprice: cart.map(item => item.price),
            productquantity: cart.map(item => item.quantity),
            paymentmode: paymentMethod,
            totalPrice,
            totalQuantity,
            splitPayments: paymentMethod === 'split' ? {
                cash: cashAmount,
                upi: upiAmount,
                card: cardAmount,
            } : null,
        };

        try {
            const response = await createOrder(orderData);
            if (response.success) {
                alert("Order placed successfully!");
                setCart([]);
            } else {
                alert("Failed to place order.");
            }
        } catch (error) {
            console.error("Error creating order:", error);
        }
    };

    return (
        <button onClick={handleSubmitOrder} className='payment-done'>
            Payment Done
        </button>
    );
};

export default OrderSubmit;
