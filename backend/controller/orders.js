import Order from '../models/orders.js';
import Product from '../models/Product.js';
import moment from 'moment'

// Create Order
const createOrder = async (req, res) => {
    try {
        const {
            productname,
            productbarcode,
            productbrand,
            productType,
            productsize,
            productprice,
            productquantity,
            paymentmode,
            totalPrice,
            totalQuantity
        } = req.body;

        // Convert fields to arrays if they're not already
        const productNames = Array.isArray(productname) ? productname : productname.split(',').map(s => s.trim());
        const productBarcodes = Array.isArray(productbarcode) ? productbarcode : productbarcode.split(',').map(s => s.trim());
        const productBrands = Array.isArray(productbrand) ? productbrand : productbrand.split(',').map(s => s.trim());
        const productTypes = Array.isArray(productType) ? productType : productType.split(',').map(s => s.trim());
        const productSizes = Array.isArray(productsize) ? productsize : productsize.split(',').map(s => s.trim());
        const productPrices = Array.isArray(productprice) ? productprice : productprice.split(',').map(s => parseFloat(s.trim()));
        const productQuantities = Array.isArray(productquantity) ? productquantity : productquantity.split(',').map(s => parseInt(s.trim(), 10));

        // Fetch products to check stock availability
        const products = await Product.find({ barcode: { $in: productBarcodes } });

        // Check stock availability
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            const quantityOrdered = productQuantities[i];

            // If there's not enough stock
            if (product.stock < quantityOrdered) {
                return res.status(400).json({ message: `Insufficient stock for product: ${product.name}` });
            }
        }

        // Update stock and order count for each product
        const stockUpdates = products.map((product, index) => {
            const quantityOrdered = productQuantities[index];

            // Calculate new stock and order count
            const newStock = product.stock - quantityOrdered;
            const newOrderCount = product.orderCount + quantityOrdered;

            // Return the update operation
            return Product.findByIdAndUpdate(
                product._id,
                { stock: newStock, orderCount: newOrderCount },
                { new: true }
            );
        });

        // Wait for all updates to complete
        const updatedProducts = await Promise.all(stockUpdates);

        // Create the order
        const order = await Order.create({
            productname: productNames,
            productbarcode: productBarcodes,
            productbrand: productBrands,
            productType: productTypes,
            productsize: productSizes,
            productprice: productPrices,
            productquantity: productQuantities,
            paymentmode,
            totalPrice,
            totalQuantity,
            orderdate: new Date(),
        });

        res.status(201).json({ success: true, order, updatedProducts });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get All Orders
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ currentTimeStamp: -1 });
        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: error.message });
    }
};

// Get Order by ID
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error fetching order:", error);
        res.status(500).json({ message: error.message });
    }
};

// Update Order
const updateOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: error.message });
    }
};

// Delete Order
const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.status(200).json({ success: true, message: 'Order deleted successfully' });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: error.message });
    }
};

// Fetch orders created today
const getTotalOrdersToday = async (req, res) => {
    try {
        const startOfDay = moment().startOf('day').toDate();
        const endOfDay = moment().endOf('day').toDate();

        const orders = await Order.find({
            currentTimeStamp: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).sort({ currentTimeStamp: -1 });

        res.status(200).json({ count: orders.length, orders });
    } catch (error) {
        console.error("Error fetching users for today:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch orders created yesterday
const getTotalOrdersYesterday = async (req, res) => {
    try {
        const startOfDay = moment().subtract(1, 'days').startOf('day').toDate();
        const endOfDay = moment().subtract(1, 'days').endOf('day').toDate();

        const orders = await Order.find({
            currentTimeStamp: {
                $gte: startOfDay,
                $lte: endOfDay,
            },
        }).sort({ currentTimeStamp: -1 });

        res.status(200).json({ count: orders.length, orders });
    } catch (error) {
        console.error("Error fetching orders for yesterday:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch orders created in the last week
const getTotalOrdersLastWeek = async (req, res) => {
    try {
        const startOfWeek = moment().subtract(1, 'weeks').startOf('week').toDate();
        const endOfWeek = moment().endOf('week').toDate();

        const orders = await Order.find({
            currentTimeStamp: {
                $gte: startOfWeek,
                $lte: endOfWeek,
            },
        }).sort({ currentTimeStamp: -1 });

        res.status(200).json({ count: orders.length, orders });
    } catch (error) {
        console.error("Error fetching orders for last week:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch orders created in the last month
const getTotalOrdersLastMonth = async (req, res) => {
    try {
        const startOfMonth = moment().subtract(1, 'months').startOf('month').toDate();
        const endOfMonth = moment().endOf('month').toDate();

        const orders = await Order.find({
            currentTimeStamp: {
                $gte: startOfMonth,
                $lte: endOfMonth,
            },
        }).sort({ currentTimeStamp: -1 });

        res.status(200).json({ count: orders.length, orders });
    } catch (error) {
        console.error("Error fetching orders for last month:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch orders created in the last year
const getTotalOrdersLastYear = async (req, res) => {
    try {
        const startOfYear = moment().subtract(1, 'years').startOf('year').toDate();
        const endOfYear = moment().endOf('year').toDate();

        const orders = await Order.find({
            currentTimeStamp: {
                $gte: startOfYear,
                $lte: endOfYear,
            },
        }).sort({ currentTimeStamp: -1 });

        res.status(200).json({ count: orders.length, orders });
    } catch (error) {
        console.error("Error fetching orders for last year:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// Fetch orders for a specific date
const getTotalOrdersByDate = async (req, res) => {
    const { date } = req.params; // Assume the date is passed in the URL, e.g., /orders/date/2024-01-01
    try {
        const startOfDate = moment(date).startOf('day').toDate();
        const endOfDate = moment(date).endOf('day').toDate();

        const orders = await Order.find({
            currentTimeStamp: {
                $gte: startOfDate,
                $lte: endOfDate,
            },
        }).sort({ currentTimeStamp: -1 });
        res.status(200).json({ count: orders.length, orders });
    } catch (error) {
        console.error("Error fetching orders for the specific date:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrder,
    deleteOrder,
    getTotalOrdersToday,
    getTotalOrdersYesterday,
    getTotalOrdersLastWeek,
    getTotalOrdersLastMonth,
    getTotalOrdersLastYear,
    getTotalOrdersByDate,
};