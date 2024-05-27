import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Container, List, ListItem, ListItemText } from '@mui/material';
import { AppService } from '../../sevices/app.service';
import { IUser } from '../../models/interfeces';

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await AppService.getUsers();
            setUsers(response);
        };
    
        fetchData();
    
    }, []);

    const handleAddUsers = async () => {
        const response = await axios.get('https://random-data-api.com/api/users/random_user?size=5');
        const newUsers = response.data.map((user: any) => ({
            first_name: user.first_name,
            last_name: user.last_name,
            username: user.username,
            email: user.email,
            password: user.password,
        }));
        newUsers.forEach(async (user: any) => {
            AppService.uploadUser(user)
        });
        setUsers([...users, ...newUsers]);
    };

    return (
        <Container>
            <Button onClick={handleAddUsers} variant="contained" color="primary">
                Add Users
            </Button>
            <List>
                {users.map(user => (
                    <ListItem key={user.id}>
                        <ListItemText primary={`${user.first_name} ${user.last_name}`} secondary={user.email} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default UsersPage;
