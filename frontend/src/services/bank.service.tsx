import axios from 'axios'
import { IBankService, IBank } from '../models/interfaces';

export const BankService: IBankService = {
    async getBankById(id) {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/api/banks/${id}/`, {
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

    async updateBank(id, data) {
        try {
            const response = await axios.put(process.env.REACT_APP_API_URL + `api/banks/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },
}