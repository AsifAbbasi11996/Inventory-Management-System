import axios from 'axios';

const API_URL = 'http://localhost:5000/orders'; 

// Fetch all Orders
export const getAllOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Add a new Order
export const createOrder = async (order) => {
    const response = await axios.post(`${API_URL}/create`, order);
    return response.data;
};

// Update Order by ID
export const updateOrder = async (id, updatedData) => {
    const response = await axios.put(`${API_URL}/update/${id}`, updatedData);
    return response.data;
};

// Delete Order by ID
export const deleteOrder = async (id) => {
    const response = await axios.delete(`${API_URL}/del/${id}`);
    return response.data;
};

// Get Order by ID
export const getOrder = async (id) => {
    const response = await axios.get(`${API_URL}/get/${id}`);
    return response.data;
};
