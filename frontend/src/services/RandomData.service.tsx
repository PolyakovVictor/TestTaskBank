import axios from 'axios'
import { IBank, IRandomDataService, IUser } from '../models/interfaces';

export const RandomDataService: IRandomDataService = {

    async getRandomUsers(count) {
        try {
            const response = await axios.get(`https://random-data-api.com/api/users/random_user?size=${count}`);
            return response.data.map((user: IUser) => ({
                id: user.id,
                username: user.username,
                password: user.password,
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            }));
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async getRandomBanks(count) {
        try {
            const response = await axios.get(`https://random-data-api.com/api/bank/random_bank?size=${count}`);
            return response.data.map((bank: IBank) => ({
                id: bank.id,
                bank_name: bank.bank_name,
                routing_number: bank.routing_number,
                swift_bic: bank.swift_bic,
            }));
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

}