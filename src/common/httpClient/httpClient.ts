import axios from 'axios';

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_DOG_API_URL,
    timeout: 4000,
});
