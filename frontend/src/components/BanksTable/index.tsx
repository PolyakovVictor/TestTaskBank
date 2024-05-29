import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BanksTableProps, IBank } from '../../models/interfaces';

const BanksTable: React.FC<BanksTableProps> = ({ banks, onEdit, onDelete }) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Bank Name</TableCell>
                        <TableCell>Routing Number</TableCell>
                        <TableCell>SWIFT/BIC</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {banks.map((bank: IBank) => (
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
