import axios from 'axios';

const API_URL = 'http://localhost:5000/user';

// Fetch all users
export const getUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// Create a new user
export const createUser = async (user) => {
    const response = await axios.post(`${API_URL}/create`, user);
    return response.data;
};

// Fetch a single user by ID
export const getUserById = async (userId) => {
    const response = await axios.get(`${API_URL}/get/${userId}`);
    return response.data;
};

// Fetch a single user by ID
export const fetchRoles = async (userId) => {
    const response = await axios.get(`${API_URL}/roles`);
    return response.data;
};

// Update a user by ID
export const updateUser = async (userId, updatedData) => {
    const response = await axios.put(`${API_URL}/update/${userId}`, updatedData);
    return response.data;
};

// Delete a user by ID
export const deleteUser = async (userId) => {
    const response = await axios.delete(`${API_URL}/del/${userId}`);
    return response.data;
};

// Login user
export const loginUser = async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
};
