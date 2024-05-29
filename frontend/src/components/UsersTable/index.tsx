import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { IUser, UsersTableProps } from '../../models/interfaces';

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete }) => {
    const [sortBy, setSortBy] = useState<keyof IUser>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: keyof IUser) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const sortedUsers = users.sort((a: IUser, b: IUser) => {
        const sortMultiplier = sortOrder === 'asc' ? 1 : -1;
        if (a[sortBy]! < b[sortBy]!) return -1 * sortMultiplier;
        if (a[sortBy]! > b[sortBy]!) return 1 * sortMultiplier;
        return 0;
    });

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell onClick={() => handleSort('id')}>ID</TableCell>
                        <TableCell onClick={() => handleSort('username')}>Username</TableCell>
                        <TableCell onClick={() => handleSort('first_name')}>First Name</TableCell>
                        <TableCell onClick={() => handleSort('last_name')}>Last Name</TableCell>
                        <TableCell onClick={() => handleSort('email')}>Email</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedUsers.map((user: IUser) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.username}</TableCell>
                            <TableCell>{user.first_name}</TableCell>
                            <TableCell>{user.last_name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(user.id)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(user.id)} color="secondary">
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UsersTable;
