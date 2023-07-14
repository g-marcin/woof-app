export type DogDetailsDTO = {
  message: string;
  status: "success" | "error";
  code?: number;
};

export type DogDetails = {
  imageSrc: string;
  status?: "success" | "error";
  code?: number;
};

export type DogListDTO = {
  message: { [k: string]: [] | string[] };
  status: string;
  code?: number;
};

export type DogEntries = [string, [] | string[]][];

export type DogVariantsDTO = {
  message: string[];
  status: "success" | "error";
  code?: number;
};

export type DogVariants = string[];

export type NavLinkState = {
  isActive: boolean;
  isPending: boolean;
};
