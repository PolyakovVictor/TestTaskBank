import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, List, ListItem, ListItemText } from '@mui/material';
import { IBank } from '../../models/interfeces';
import { AppService } from '../../sevices/app.service';


const BanksPage: React.FC = () => {
    const [banks, setBanks] = useState<IBank[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await AppService.getBanks();
            setBanks(response);
        };
    
        fetchData();
    
    }, []);

    const handleAddBanks = async () => {
        const response = await axios.get('https://random-data-api.com/api/bank/random_bank?size=5');
        const newBanks = response.data.map((bank: any) => ({
            bank_name: bank.bank_name,
            routing_number: bank.routing_number,
            swift_bic: bank.swift_bic,
        }));
        newBanks.forEach(async (bank: any) => {
            AppService.uploadBank(bank)
        });
        setBanks([...banks, ...newBanks]);
    };

    return (
        <Container>
            <Button onClick={handleAddBanks} variant="contained" color="primary">
                Add Banks
            </Button>
            <List>
                {banks.map(bank => (
                    <ListItem key={bank.id}>
                        <ListItemText primary={bank.bank_name} secondary={bank.swift_bic} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default BanksPage;
