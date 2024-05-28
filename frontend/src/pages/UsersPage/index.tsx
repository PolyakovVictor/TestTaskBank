import React, { useEffect, useState } from 'react';
import {
    Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions, MenuItem, Select
} from '@mui/material';
import { IUser } from '../../models/interfaces';
import { IBank } from '../../models/interfaces';
import { AppService } from '../../services/app.service';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [banks, setBanks] = useState<IBank[]>([]);
    const [addCount, setAddCount] = useState(1);
    const [editUser, setEditUser] = useState<IUser | null>(null);
    const [openEditDialog, setOpenEditDialog] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const usersResponse = await AppService.getUsers();
            setUsers(usersResponse);
            const banksResponse = await AppService.getBanks();
            setBanks(banksResponse);
        };

        fetchData();
    }, []);

    const handleAddUsers = async () => {
        const newUsers = await AppService.getRandomUsers(addCount);
        newUsers.forEach(async (user: IUser) => {
            await AppService.uploadUser(user);
        });
        setUsers([...users, ...newUsers]);
    };

    const handleEdit = (user: IUser) => {
        setEditUser(user);
        setOpenEditDialog(true);
    };

    const handleDelete = async (id: number) => {
        await AppService.deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
    };

    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
        setEditUser(null);
    };

    const handleSave = async () => {
        if (editUser) {
            const updatedUser = await AppService.updateUser(editUser.id, {
                ...editUser,
                banks: editUser.banks?.map(bank => (typeof bank === 'object' ? bank.id : bank)) || [] // Проверка на undefined и тип объекта
            });
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setEditUser(null);
        }
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        if (editUser) {
            setEditUser({ ...editUser, [e.target.name as string]: e.target.value });
        }
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user: IUser) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(user)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => handleDelete(user.id)} color="secondary">
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        name="username"
                        value={editUser?.username || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        name="first_name"
                        value={editUser?.first_name || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        name="last_name"
                        value={editUser?.last_name || ''}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        name="email"
                        value={editUser?.email || ''}
                        onChange={handleEditChange}
                    />
                    <Select
                        multiple
                        value={editUser?.banks?.filter(bank => typeof bank !== 'number').map(bank => (bank as IBank).id) || []}
                        onChange={(e) => {
                            const selectedBanks = e.target.value as number[];
                            if (editUser) {
                                setEditUser({
                                    ...editUser,
                                    banks: selectedBanks.map(id => banks.find(bank => bank.id === id) as IBank)
                                });
                            }
                        }}
                        fullWidth
                    >

                        {banks.map((bank) => (
                            <MenuItem key={bank.id} value={bank.id}>
                                {bank.bank_name}
                            </MenuItem>
                        ))}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEditDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UsersPage;
