import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  barcode: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  mrp: { type: Number, required: true },
  stock: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String },
  type: { type: String, enum: ['bottle', 'can'], required: true },
  size: { type: String, required: true },
  orderCount: { type: Number, default: 0 },
  sales: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product