import axios from 'axios'
import { IAppService, IBank } from '../models/interfeces';

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
}