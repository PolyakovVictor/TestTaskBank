import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import { EditUserDialogProps, IBank, IUser } from '../../models/interfaces';

const EditUserDialog: React.FC<EditUserDialogProps> = ({
    user,
    banks,
    open,
    onClose,
    onSave
}) => {
    const [editUser, setEditUser] = useState<IUser | null>(null);

    useEffect(() => {
        if (user) {
            setEditUser(user);
        }
    }, [user]);

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        if (editUser) {
            setEditUser({ ...editUser, [e.target.name as string]: e.target.value });
        }
    };

    const handleBankChange = (selectedBanks: number[]) => {
        if (editUser) {
            setEditUser({
                ...editUser,
                banks: selectedBanks.map(id => banks.find(bank => bank.id === id) as IBank)
            });
        }
    };

    const handleSave = () => {
        if (editUser) {
            onSave(editUser);
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
                <FormControl fullWidth>
                    <InputLabel id="banks-label">Banks</InputLabel>
                    <Select
                        multiple
                        value={editUser?.banks?.filter(bank => typeof bank !== 'number').map(bank => (bank as IBank).id) || []}
                        onChange={(e) => handleBankChange(e.target.value as number[])}
                        fullWidth
                        labelId="banks-label"
                        label="Banks"
                    >
                        {banks.map((bank) => (
                            <MenuItem key={bank.id} value={bank.id}>
                                {bank.bank_name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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