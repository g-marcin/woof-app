export interface Response {
    status?: 'success' | 'error'
    code?: number
}

export interface DogDetails extends Response {
    imageSrc: string
}

export type DogEntries = [string, [] | string[]][]

export type DogVariants = string[]

export type NavLinkState = {
    isActive: boolean
}
