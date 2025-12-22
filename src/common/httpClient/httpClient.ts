import axios from 'axios';

export const httpClient = axios.create({
    baseURL: `https://mgrzmil.dev/dog-api/api`,
    timeout: 4000,
});
