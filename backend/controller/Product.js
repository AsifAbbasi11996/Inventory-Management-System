import Product from '../models/Product.js';

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find(); // Fetch all products from the database
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get product by barcode
const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  console.log(req.body); // Log incoming request data
  try {
    // Create a new product with the provided data, including the brand
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Failed to add product' });
  }
};

// Update product by barcode
const updateProduct = async (req, res) => {
  try {
    // Update the product based on the provided barcode and request body
    const product = await Product.findOneAndUpdate(
      { barcode: req.params.barcode },
      req.body,
      { new: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Failed to update product' });
  }
};

// Delete product by barcode
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ barcode: req.params.barcode });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
};

export { addProduct, updateProduct, deleteProduct, getProduct, getAllProducts };
