import React, { useEffect, useState } from 'react';
import {
    Container, Button, TextField, Box, Snackbar
} from '@mui/material';
import { IUser, IBank } from '../../models/interfaces';
import { UserService } from '../../services/user.service';
import { BankService } from '../../services/bank.service';
import EditUserDialog from '../../components/EditUserDialog';
import Alert from '@mui/material/Alert';
import UsersTable from '../../components/UsersTable';

const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [banks, setBanks] = useState<IBank[]>([]);
    const [addCount, setAddCount] = useState(1);
    const [editUser, setEditUser] = useState<IUser | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const usersResponse = await UserService.getUsers();
            setUsers(usersResponse);
            const banksResponse = await BankService.getBanks();
            setBanks(banksResponse);
        };

        fetchData();
    }, []);

    const handleAddUsers = async () => {
        const newUsers = await UserService.getRandomUsers(addCount);
        newUsers.forEach(async (user: IUser) => {
            await UserService.uploadUser(user);
        });
        setUsers([...users, ...newUsers]);
    };

    const handleEdit = async (id: number) => {
        const userDetails = await UserService.getUserById(id);
        setEditUser(userDetails);
        setOpenEditDialog(true);
    };

    const handleDelete = async (id: number) => {
        await UserService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditUser(null);
    };

    const handleSaveEditDialog = async (updatedUser: IUser) => {
        if (updatedUser) {
            try {
                const updated = await UserService.updateUser(updatedUser.id, {
                    ...updatedUser,
                    banks: updatedUser.banks?.map(bank => (typeof bank === 'object' ? bank.id : bank)) || []
                });
                setUsers(users.map(user => user.id === updated.id ? updated : user));
                setOpenEditDialog(false);
                setEditUser(null);
                setSnackbarMessage('User details updated successfully.');
                setSnackbarOpen(true);
            } catch (error) {
                console.error('Failed to update user:', error);
                setSnackbarMessage('Failed to update user details.');
                setSnackbarOpen(true);
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Container>
            <h1>Users</h1>
            <Box display="flex" alignItems="center" mb={2}>
                <TextField
                    label="Number of users to add"
                    type="number"
                    value={addCount}
                    onChange={(e) => setAddCount(Number(e.target.value))}
                    InputProps={{ inputProps: { min: 1 } }}
                    style={{ marginRight: '1rem' }}
                />
                <Button variant="contained" color="primary" onClick={handleAddUsers}>
                    Add Users
                </Button>
            </Box>
            <UsersTable
                users={users}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <EditUserDialog
                user={editUser}
                banks={banks}
                open={openEditDialog}
                onClose={handleCloseEditDialog}
                onSave={handleSaveEditDialog}
            />
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
            >
                <Alert onClose={handleSnackbarClose} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default UsersPage;
