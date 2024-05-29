import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BanksTableProps, IBank } from '../../models/interfaces';

const BanksTable: React.FC<BanksTableProps> = ({ banks, onEdit, onDelete }) => {
    const [sortBy, setSortBy] = useState<keyof IBank>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleSort = (column: keyof IBank) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const sortedBanks = banks.sort((a: IBank, b: IBank) => {
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
                        <TableCell onClick={() => handleSort('bank_name')}>Bank Name</TableCell>
                        <TableCell onClick={() => handleSort('routing_number')}>Routing Number</TableCell>
                        <TableCell onClick={() => handleSort('swift_bic')}>SWIFT/BIC</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedBanks.map((bank: IBank) => (
                        <TableRow key={bank.id}>
                            <TableCell>{bank.id}</TableCell>
                            <TableCell>{bank.bank_name}</TableCell>
                            <TableCell>{bank.routing_number}</TableCell>
                            <TableCell>{bank.swift_bic}</TableCell>
                            <TableCell>
                                <IconButton onClick={() => onEdit(bank.id)} color="primary">
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(bank.id)} color="secondary">
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

export default BanksTable;
