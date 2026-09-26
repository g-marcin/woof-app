import type { CreateClientConfig } from './generated/client.gen'

export const createClientConfig: CreateClientConfig = config => ({
    ...config,
    baseURL: import.meta.env.VITE_DOG_API_URL,
    timeout: 4000,
})
