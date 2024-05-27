import React, { useEffect, useState } from 'react';
import { Container, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, TextField, Box } from '@mui/material';
import { IBank } from '../../models/interfeces';
import { AppService } from '../../sevices/app.service';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const BanksPage = () => {
    const [banks, setBanks] = useState<IBank[]>([]);
    const [addCount, setAddCount] = useState(1);

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
            AppService.uploadBank(bank)
        });
        setBanks([...banks, ...newBanks]);
    };

    const handleEdit = (id: number) => {
        console.log(`Edit bank with id ${id}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete bank with id ${id}`);
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
                        {banks.map((bank: any) => (
                            <TableRow key={bank.id}>
                                <TableCell>{bank.id}</TableCell>
                                <TableCell>{bank.bank_name}</TableCell>
                                <TableCell>{bank.routing_number}</TableCell>
                                <TableCell>{bank.swift_bic}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleEdit(bank.id)} color="primary">
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
        </Container>
    );
};

export default BanksPage;
