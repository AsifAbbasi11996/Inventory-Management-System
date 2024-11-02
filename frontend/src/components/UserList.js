import React, { useEffect, useState } from 'react';
import { getUsers, deleteUser } from '../api/userApi';
import UserTable from './UserTable';
import '../assets/styles/UserList.css'

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [rows, setRows] = useState(10);
    const [roleFilter, setroleFilter] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response);
                setFilteredUsers(response); // Initialize filtered users
            } catch (error) {
                console.error("Failed to fetch users:", error);
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [rows, roleFilter, searchTerm, users]);

    const applyFilters = () => {
        let filtered = [...users];

        // Filter by role
        if (roleFilter) {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        // Filter by search term (name, email, role)
        if (searchTerm) {
            filtered = filtered.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.role.includes(searchTerm)
            );
        }

        setFilteredUsers(filtered.slice(0, rows)); // Limit number of rows displayed
    };

    const handleDelete = async (_id) => {
        await deleteUser(_id);
        setUsers(users.filter((user) => user._id !== _id));
    };

    const handleRowsChange = (event) => {
        setRows(parseInt(event.target.value, 10));
    };

    const handleRoleChange = (event) => {
        setroleFilter(event.target.value);
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    return (
        <div className='user-list_container'>
            <h2>Users List</h2>
            <div className='filters'>
                <div className='rows'>
                    <label>Users by rows</label>
                    <select value={rows} onChange={handleRowsChange}>
                        <option value={10}>10 Users</option>
                        <option value={20}>20 Users</option>
                    </select>
                </div>
                <div className='role'>
                    <label>Role</label>
                    <select value={roleFilter} onChange={handleRoleChange}>
                        <option value="">All Roles</option>
                        {Array.from(new Set(users.map(user => user.role)))
                            .map(role => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                    </select>
                </div>
                <div className='search_user'>
                    <label>Search User</label>
                    <input
                        type='search'
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder='Search by name, email or role'
                    />
                </div>
            </div>
            <UserTable users={filteredUsers} setUsers={setUsers} onDelete={handleDelete} />
        </div>
    );
};

export default UserList;
