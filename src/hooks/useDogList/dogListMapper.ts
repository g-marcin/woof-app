import { DogListDTO } from "../../types";

export const dogListMapper = (dogListDTO: DogListDTO) => {
  return Object.entries(dogListDTO.message);
};
