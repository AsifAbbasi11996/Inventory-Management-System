import axios from 'axios';

const API_URL = 'http://localhost:5000/products'; 

// Fetch all products
export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Add a new product
export const addProduct = async (product) => {
    const response = await axios.post(`${API_URL}/add`, product);
    return response.data;
};

// Update product by barcode
export const updateProduct = async (barcode, updatedData) => {
    const response = await axios.put(`${API_URL}/update/${barcode}`, updatedData);
    return response.data;
};

// Delete product by barcode
export const deleteProduct = async (barcode) => {
    const response = await axios.delete(`${API_URL}/del/${barcode}`);
    return response.data;
};

// Get product by barcode
export const getProduct = async (barcode) => {
    const response = await axios.get(`${API_URL}/get/${barcode}`);
    return response.data;
};


// Get recent product 
export const getAllRecentProducts = async () => {
    const response = await axios.get(`${API_URL}/recent`);
    return response.data
}