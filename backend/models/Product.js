import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  barcode: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String },
  expiryDate: { type: Date }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product