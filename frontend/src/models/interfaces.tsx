export interface IAppService {
    getUsers(): Promise<IUser[]>;
    getBanks(): Promise<IBank[]>;
    uploadBank(data: IBank): Promise<any>;
    uploadUser(data: IUser): Promise<any>;
    getRandomUsers(count: number): Promise<IUser[]>;
    getRandomBanks(count: number): Promise<IBank[]>;
    deleteBank(bankId: number): Promise<any>;
    deleteUser(userId: number): Promise<any>;
    updateUser(id: number, data: Partial<IUser>): Promise<IUser>;
    updateBank(id: number, data: IBank): Promise<any>;
}

export interface IBank {
    id: number;
    bank_name: string;
    routing_number: string;
    swift_bic: string;
    users: IUser[];
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
