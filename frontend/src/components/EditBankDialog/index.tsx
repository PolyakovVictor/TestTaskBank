import React, { useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Select, MenuItem
} from '@mui/material';
import { IBank, IUser } from '../../models/interfaces';
import { AppService } from '../../services/app.service';

interface EditBankDialogProps {
    bank: IBank | null;
    open: boolean;
    onClose: () => void;
    onSave: (updatedBank: IBank) => void;
}

const EditBankDialog: React.FC<EditBankDialogProps> = ({ bank, open, onClose, onSave }) => {
    const [editBank, setEditBank] = useState<IBank | null>(null);
    const [users, setUsers] = useState<IUser[]>([]);

    useEffect(() => {
        if (bank) {
            setEditBank(bank);
            console.log(editBank)
            fetchUsers();
        }
    }, [bank]);

    const fetchUsers = async () => {
        const usersResponse = await AppService.getUsers();
        setUsers(usersResponse);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        if (editBank) {
            setEditBank({ ...editBank, [e.target.name as string]: e.target.value });
        }
    };

    const handleUserChange = (selectedUsers: number[]) => {
        if (editBank) {
            setEditBank({
                ...editBank,
                users: selectedUsers.map(id => users.find(user => user.id === id) as IUser)
            });
        }
    };

    const handleSave = () => {
        if (editBank) {
            onSave(editBank);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Edit Bank</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Bank Name"
                    type="text"
                    fullWidth
                    name="bank_name"
                    value={editBank?.bank_name || ''}
                    onChange={handleEditChange}
                />
                <TextField
                    margin="dense"
                    label="Routing Number"
                    type="text"
                    fullWidth
                    name="routing_number"
                    value={editBank?.routing_number || ''}
                    onChange={handleEditChange}
                />
                <TextField
                    margin="dense"
                    label="SWIFT/BIC"
                    type="text"
                    fullWidth
                    name="swift_bic"
                    value={editBank?.swift_bic || ''}
                    onChange={handleEditChange}
                />
                <Select
                    multiple
                    value={editBank?.users?.filter(user => typeof user !== 'number').map(user => (user as IUser).id) || []}
                    onChange={(e) => handleUserChange(e.target.value as number[])}
                    fullWidth
                >
                    {users.map((user) => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.username}
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

export default EditBankDialog;
