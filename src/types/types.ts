export interface Response {
    status?: 'success' | 'error';
    code?: number;
}
export interface DogDetailsDTO extends Response {
    message: string;
}
export interface DogDetails extends Response {
    imageSrc: string;
}
export interface DogListDTO extends Response {
    message: { [k: string]: [] | string[] };
}
export type DogEntries = [string, [] | string[]][];

export interface DogVariantsDTO extends Response {
    message: string[];
}

export type DogVariants = string[];

export type NavLinkState = {
    isActive: boolean;
};
