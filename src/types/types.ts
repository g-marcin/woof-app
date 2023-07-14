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

export type DogList = string[];
