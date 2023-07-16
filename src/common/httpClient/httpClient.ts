import axios from 'axios';

export const httpClient = axios.create({
    baseURL: `https://dog.ceo/api`,
    timeout: 4000,
});
