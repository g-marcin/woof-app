export type DogDetailsDTO = {
  message: string;
  status: "success" | "error";
  code?: number;
};

export interface Response {
  status?: "success" | "error";
  code?: number;
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
  isPending: boolean;
};
