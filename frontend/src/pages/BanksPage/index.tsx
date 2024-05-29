import React, { useEffect, useState } from 'react';
import {
    Container,Button, TextField, Box, Snackbar
} from '@mui/material';
import { IBank } from '../../models/interfaces';
import { AppService } from '../../services/app.service';
import EditBankDialog from '../../components/EditBankDialog';
import Alert from '@mui/material/Alert';
import BanksTable from '../../components/BanksTable';

const BanksPage = () => {
    const [banks, setBanks] = useState<IBank[]>([]);
    const [addCount, setAddCount] = useState(1);
    const [editBank, setEditBank] = useState<IBank | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarType, setSnackbarType] = useState<'success' | 'error' | 'warning' | 'info'>('success');

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

    const handleEdit = async (id: number) => {
        const bankDetails = await AppService.getBankById(id);
        setEditBank(bankDetails);
        setOpenEditDialog(true);
    };

    const handleDelete = async (id: number) => {
        try {
            const bank = banks.find(bank => bank.id === id);
            if (bank?.users && bank.users.length > 0) {
                setSnackbarType('error');
                setSnackbarMessage('Cannot delete bank with users attached.');
                setOpenSnackbar(true);
            } else {
                await AppService.deleteBank(id);
                setBanks(banks.filter(bank => bank.id !== id));
            }
        } catch (error) {
            console.error('Failed to delete bank:', error);
            setSnackbarMessage('Failed to delete bank.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditBank(null);
        setOpenSnackbar(false);
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
            setSnackbarType('success');
            setSnackbarMessage('Bank updated successfully.');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Failed to update bank:', error);
            setSnackbarMessage('Failed to update bank.');
            setOpenSnackbar(true);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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
            <BanksTable
                banks={banks}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <EditBankDialog
                bank={editBank}
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                onSave={handleSaveEditDialog}
            />
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarType}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default BanksPage;

