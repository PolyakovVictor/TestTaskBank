import React, { useEffect, useState } from 'react';
import {
    Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, Box
} from '@mui/material';
import { IBank } from '../../models/interfaces';
import { AppService } from '../../services/app.service';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditBankDialog from '../../components/EditBankDialog';

const BanksPage = () => {
    const [banks, setBanks] = useState<IBank[]>([]);
    const [addCount, setAddCount] = useState(1);
    const [editBank, setEditBank] = useState<IBank | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await AppService.getBanks();
            setBanks(response);
        };

        fetchData();
    }, []);

    const handleAddBanks = async () => {
        const newBanks = await AppService.getRandomBanks(addCount);
        newBanks.forEach(async (bank: IBank) => {
            await AppService.uploadBank(bank);
        });
        setBanks([...banks, ...newBanks]);
    };

    const handleEdit = (bank: IBank) => {
        setEditBank(bank);
        setOpenEditDialog(true);
    };

    const handleDelete = async (id: number) => {
        try {
            await AppService.deleteBank(id);
            setBanks(banks.filter(bank => bank.id !== id));
        } catch (error) {
            console.error('Failed to delete bank:', error);
        }
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditBank(null);
    };

    const handleSaveEditDialog = async (updatedBank: IBank) => {
        try {
            const updated = await AppService.updateBank(updatedBank.id, {
                ...updatedBank,
                users: updatedBank.users?.map(user => (typeof user === 'object' ? user.id : user)) || []
            });
            setBanks(banks.map(bank => bank.id === updated.id ? { ...updated, users: updatedBank.users } : bank));
            setOpenEditDialog(false);
            setEditBank(null);
        } catch (error) {
            console.error('Failed to update bank:', error);
        }
    };

    return (
        <Container>
            <h1>Banks</h1>
            <Box display="flex" alignItems="center" mb={2}>
                <TextField
                    label="Number of banks to add"
                    type="number"
                    value={addCount}
                    onChange={(e) => setAddCount(Number(e.target.value))}
                    InputProps={{ inputProps: { min: 1 } }}
                    style={{ marginRight: '1rem' }}
                />
                <Button variant="contained" color="primary" onClick={handleAddBanks}>
                    Add Banks
                </Button>
            </Box>
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
                                    <IconButton onClick={() => handleEdit(bank)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(bank.id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditBankDialog
                bank={editBank}
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                onSave={handleSaveEditDialog}
            />
        </Container>
    );
};

export default BanksPage;
