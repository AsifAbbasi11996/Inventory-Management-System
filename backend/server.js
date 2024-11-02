import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import products from './routes/Product.js'
import users from './routes/user.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors())

// Database connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', products);
app.use('/api/user', users)

app.get('/', (req, res) => {
    res.send('API is running');
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});