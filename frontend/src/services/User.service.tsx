import axios from 'axios'
import { IUser, IUserService } from '../models/interfaces';

export const UserService: IUserService = {
    async getUserById(id) {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + `/api/users/${id}/`, {
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

    async deleteUser(userId) {
        try {
            const response = await axios.delete(process.env.REACT_APP_API_URL + `api/users/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },

    async updateUser(id, data) {
        try {
            console.log('user update:', data)
            const response = await axios.put(process.env.REACT_APP_API_URL + `api/users/${id}/`, data);
            return response.data;
        } catch (error) {
            console.error('Error when sending a request:', error);
            throw error;
        }
    },
}