// EditUserDialog.tsx

import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Select, MenuItem
} from '@mui/material';
import { IUser } from '../../models/interfaces';
import { IBank } from '../../models/interfaces';

interface Props {
    open: boolean;
    onClose: () => void;
    user: IUser | null;
    banks: IBank[];
    onSave: (user: IUser) => void;
}

const EditUserDialog: React.FC<Props> = ({ open, onClose, user, banks, onSave }) => {
    const [editedUser, setEditedUser] = useState<IUser | null>(user);

    useEffect(() => {
        setEditedUser(user || null);
      }, [user]);

    const handleSave = () => {
        if (editedUser) {
            onSave(editedUser);
            onClose();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        if (editedUser) {
            setEditedUser({ ...editedUser, [e.target.name as string]: e.target.value });
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit User</DialogTitle>
            <DialogContent>
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        name="username"
                        value={editedUser?.username || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="First Name"
                        type="text"
                        fullWidth
                        name="first_name"
                        value={editedUser?.first_name || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Last Name"
                        type="text"
                        fullWidth
                        name="last_name"
                        value={editedUser?.last_name || ''}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        name="email"
                        value={editedUser?.email || ''}
                        onChange={handleChange}
                    />
                    <Select
                        multiple
                        value={editedUser?.banks?.filter(bank => typeof bank !== 'number').map(bank => (bank as IBank).id) || []}
                        onChange={(e) => {
                            const selectedBanks = e.target.value as number[];
                            if (editedUser) {
                                setEditedUser({
                                    ...editedUser,
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
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserDialog;