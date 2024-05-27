import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, Box } from '@mui/material';
import { IUser } from '../../models/interfeces';
import { AppService } from '../../sevices/app.service';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const UsersPage = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [addCount, setAddCount] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const response = await AppService.getUsers();
            setUsers(response);
        };

        fetchData();
    }, []);

    const handleAddUsers = async () => {
        const newUsers = await AppService.getRandomUsers(addCount);
        setUsers([...users, ...newUsers]);
    };

    const handleEdit = (id: number) => {
        console.log(`Edit user with id ${id}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete user with id ${id}`);
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
                        {users.map((user: any) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.id}</TableCell>
                                <TableCell>{user.username}</TableCell>
                                <TableCell>{user.first_name}</TableCell>
                                <TableCell>{user.last_name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(user.id)} color="primary">
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
        </Container>
    );
};

export default UsersPage;
