import React, { useState, useEffect } from 'react';
import '../assets/styles/EditUser.css';
import { fetchRoles } from '../api/userApi.js'; // Import the fetchRoles function

const EditUser = ({ isOpen, onClose, user, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);
    const [roles, setRoles] = useState([]); // State to store roles

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    useEffect(() => {
        const getRoles = async () => {
            try {
                const response = await fetchRoles(); // Fetch roles from backend
                setRoles(response.roles); // Set the roles in state
            } catch (error) {
                console.error("Error fetching roles:", error.message);
            }
        };
        getRoles();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedUser);
        onClose(); 
    };

    return (
        isOpen && (
            <div className="modal-overlay2">
                <div className="modal-content">
                    <h2>Edit User</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={editedUser.name}
                            onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            value={editedUser.email}
                            onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                            placeholder="Email"
                        />
                        <select
                            value={editedUser.role}
                            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            {roles.map((roleOption) => (
                                <option key={roleOption} value={roleOption}>
                                    {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={editedUser.phoneNumber}
                            onChange={(e) => setEditedUser({ ...editedUser, phoneNumber: e.target.value })}
                            placeholder="Phone Number"
                        />
                        <div className='btns'>
                            <button type="submit">Save</button>
                            <button type="button" onClick={onClose}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default EditUser;
