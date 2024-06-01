export interface IBankService {
    getBanks(): Promise<IBank[]>;
    getBankById(id: number): Promise<IBank>;
    uploadBank(data: IBank): Promise<any>;
    deleteBank(bankId: number): Promise<any>;
    updateBank(id: number, data: IBank): Promise<any>;
}

export interface IUserService {
    getUsers(): Promise<IUser[]>;
    getUserById(id: number): Promise<IUser>;
    uploadUser(data: IUser): Promise<any>;
    deleteUser(userId: number): Promise<any>;
    updateUser(id: number, data: Partial<IUser>): Promise<IUser>;
}

export interface IRandomDataService {
    getRandomUsers(count: number): Promise<IUser[]>;
    getRandomBanks(count: number): Promise<IBank[]>;
}

export interface IBank {
    id: number;
    bank_name: string;
    routing_number: string;
    swift_bic: string;
    users?: Array<IUser | number>;
}

export interface IUser {
    id: number;
    password: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    banks?: Array<IBank | number>;
}

export interface EditUserDialogProps {
    user: IUser | null;
    banks: IBank[];
    open: boolean;
    onClose: () => void;
    onSave: (updatedUser: IUser) => void;
}

export interface UsersTableProps {
    users: IUser[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export interface BanksTableProps {
    banks: IBank[];
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}


export interface EditBankDialogProps {
    bank: IBank | null;
    open: boolean;
    onClose: () => void;
    onSave: (updatedBank: IBank) => void;
}
