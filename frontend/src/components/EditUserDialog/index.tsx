import React from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem
} from '@mui/material';
import { IBank, IUser } from '../../models/interfaces';

interface EditUserDialogProps {
    user: IUser | null;
    banks: IBank[];
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => void;
    onBankChange: (selectedBanks: number[]) => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({
    user,
    banks,
    open,
    onClose,
    onSave,
    onChange,
    onBankChange,
}) => {
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
                    value={user?.username || ''}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    label="First Name"
                    type="text"
                    fullWidth
                    name="first_name"
                    value={user?.first_name || ''}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    label="Last Name"
                    type="text"
                    fullWidth
                    name="last_name"
                    value={user?.last_name || ''}
                    onChange={onChange}
                />
                <TextField
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    name="email"
                    value={user?.email || ''}
                    onChange={onChange}
                />
                <Select
                    multiple
                    value={user?.banks?.filter(bank => typeof bank !== 'number').map(bank => (bank as IBank).id) || []}
                    onChange={(e) => onBankChange(e.target.value as number[])}
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
                <Button onClick={onSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditUserDialog;
