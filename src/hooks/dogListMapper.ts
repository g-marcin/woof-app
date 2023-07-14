import { DogListDTO } from "../types";

export const dogListMapper = (dogListDTO: DogListDTO) => {
  console.log(dogListDTO);
  return Object.keys(dogListDTO.message);
};
