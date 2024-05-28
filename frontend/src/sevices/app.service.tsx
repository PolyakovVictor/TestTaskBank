import axios from 'axios'
import { IAppService, IBank, IUser } from '../models/interfeces';

export const AppService: IAppService = {

    async getUsers() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'api/users/', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async getBanks() {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + 'api/banks/', {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async uploadBank(data) {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + 'api/banks/',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                },
            );
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async uploadUser(data) {
        try {
            const response = await axios.post(
                process.env.REACT_APP_API_URL + 'api/users/',
                data,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                },
            );
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async getRandomUsers(count) {
        try {
            const response = await axios.get(`https://random-data-api.com/api/users/random_user?size=${count}`);
            return response.data.map((user: IUser) => ({
                id: user.id,
                username: user.username,
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

    async deleteBank(bankId) {
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL + `api/banks/${bankId}`);
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async deleteUser(userId) {
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL + `api/banks/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },
}