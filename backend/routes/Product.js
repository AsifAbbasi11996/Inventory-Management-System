import express from 'express';
import { getProduct, addProduct, updateProduct, deleteProduct, getAllProducts } from '../controller/Product.js';

const router = express.Router();

// Route to get all products
router.get('/', getAllProducts); // Adjust the endpoint as needed

// Route to get product by barcode
router.get('/get/:barcode', getProduct);

// Route to add a new product
router.post('/add', addProduct);

// Route to update a product
router.put('/update/:barcode', updateProduct);

// Route to delete a product
router.delete('/del/:barcode', deleteProduct);

export default router;
