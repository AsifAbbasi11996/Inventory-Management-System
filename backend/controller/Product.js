import Product from '../models/Product.js';

// Add a new product
const addProduct = async (req, res) => {
  console.log(req.body); // Log incoming request data
  try {
    const { name, barcode, price, mrp, stock, brand, category, type, size, orderCount = 0 } = req.body;

    // Calculate initial sales value
    const sales = price * orderCount;

    // Create a new product with the calculated sales
    const newProduct = new Product({
      name,
      barcode,
      price,
      mrp,
      stock,
      brand,
      category,
      type,
      size,
      orderCount,
      sales
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ message: 'Failed to add product' });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// Get all recent products (sorted by creation date)
const getAllRecentProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch recent products' });
  }
};

// Get a product by barcode
const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ barcode: req.params.barcode });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update product by barcode (recalculates sales if price or orderCount is updated)
const updateProduct = async (req, res) => {
  try {
    const { price, orderCount } = req.body;

    // Retrieve the existing product to apply changes
    const existingProduct = await Product.findOne({ barcode: req.params.barcode });
    if (!existingProduct) return res.status(404).json({ message: 'Product not found' });

    // Update sales if price or orderCount is provided in the request
    const updatedSales = (price ?? existingProduct.price) * (orderCount ?? existingProduct.orderCount);

    const updatedProduct = await Product.findOneAndUpdate(
      { barcode: req.params.barcode },
      { ...req.body, sales: updatedSales },
      { new: true }
    );
    
    res.json(updatedProduct);
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

// Get Total Order Count for All Products
const getTotalOrderCount = async (req, res) => {
  try {
      // Calculate total order count by summing up the orderCount field of all products
      const totalOrders = await Product.aggregate([
          {
              $group: {
                  _id: null, // No specific group, we want the total
                  totalOrderCount: { $sum: "$orderCount" } // Sum the orderCount
              }
          }
      ]);

      // Check if there are any products
      const totalCount = totalOrders.length > 0 ? totalOrders[0].totalOrderCount : 0;

      res.status(200).json({ success: true, totalOrderCount: totalCount });
  } catch (error) {
      console.error("Error fetching total order count:", error);
      res.status(500).json({ message: error.message });
  }
};

// Get Total Sales for All Products
const getTotalSales = async (req, res) => {
  try {
      const totalSales = await Product.aggregate([
          {
              $group: {
                  _id: null,
                  totalSales: { $sum: "$sales" } // Sum the sales field
              }
          }
      ]);

      const salesCount = totalSales.length > 0 ? totalSales[0].totalSales : 0;

      res.status(200).json({ success: true, totalSales: salesCount });
  } catch (error) {
      console.error("Error fetching total sales:", error);
      res.status(500).json({ message: error.message });
  }
};

// Get Total Products Count
const getTotalProducts = async (req, res) => {
  try {
      const totalCount = await Product.countDocuments(); // Count all products

      res.status(200).json({ success: true, totalProducts: totalCount });
  } catch (error) {
      console.error("Error fetching total products count:", error);
      res.status(500).json({ message: error.message });
  }
};

export {
  addProduct,
  getAllProducts,
  getAllRecentProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getTotalOrderCount,
  getTotalSales,    
  getTotalProducts   
};