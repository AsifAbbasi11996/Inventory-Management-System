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

// Get Today Orders
export const getTotalOrdersToday = async () => {
    const response = await axios.get(`${API_URL}/today`);
    return response.data;
};

// Get Yesterday Orders
export const getTotalOrdersYesterday = async () => {
    const response = await axios.get(`${API_URL}/yesterday`);
    return response.data;
};

// Get Last Week Orders
export const getTotalOrdersLastWeek = async () => {
    const response = await axios.get(`${API_URL}/lastweek`);
    return response.data;
};

// Get Last Month Orders
export const getTotalOrdersLastMonth = async () => {
    const response = await axios.get(`${API_URL}/lastmonth`);
    return response.data;
};

// Get Last Year Orders
export const getTotalOrdersLastYear = async () => {
    const response = await axios.get(`${API_URL}/lastyear`);
    return response.data;
};

// Get Orders by date ....e.g yyyy-mm-dd
export const getTotalOrdersByDate = async (date) => {
    const response = await axios.get(`${API_URL}/${date}`);
    return response.data;
};