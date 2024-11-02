import React, { useState } from 'react';
import '../assets/styles/UserTable.css';
import { MdEdit, MdDelete } from "react-icons/md";
import { updateUser } from '../api/userApi.js';
import EditUser from './EditUser';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const UserTable = ({ users, onDelete, setUsers }) => {
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handleEditClick = (user) => {
        setSelectedUser(user);
        setIsEditModalOpen(true);
    };

    const handleModalClose = () => {
        setIsEditModalOpen(false);
        setSelectedUser(null);
    };

    const handleSave = async (updatedUser) => {
        try {
            await updateUser(updatedUser._id, updatedUser);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === updatedUser._id ? updatedUser : user
                )
            );
            handleModalClose();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteClick = (user) => {
        setSelectedUser(user); 
        setIsDeleteModalOpen(true);
    };

    const handleDeleteConfirm = () => {
        onDelete(selectedUser._id);
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
    };

    const handleDeleteCancel = () => {
        setIsDeleteModalOpen(false);
        setSelectedUser(null); 
    };

    return (
        <>
            <div className='users'>
                {users && users.length > 0 ? (
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Sr. no</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Phone Number</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user.User}>
                                    <td>{index + 1}</td>
                                    <td>{user.name}</td>
                                    <td className='email'>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>{user.phoneNumber}</td>
                                    <td className='actions'>
                                        <button onClick={() => handleEditClick(user)} className='edit'>
                                            <MdEdit /> Edit
                                        </button>
                                        <button onClick={() => handleDeleteClick(user)} className='delete'>
                                            <MdDelete/> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No users available</p>
                )}
            </div>
            {selectedUser && (
                <EditUser
                    isOpen={isEditModalOpen}
                    onClose={handleModalClose}
                    user={selectedUser}
                    onSave={handleSave}
                />
            )}
            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={handleDeleteCancel}
                onDelete={handleDeleteConfirm}
                name={selectedUser ? selectedUser.name : 'this user'}
            />
        </>
    );
};

export default UserTable;
