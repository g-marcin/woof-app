import { DogBreedsDTO } from "../types";

export const dogBreedsMapper = (dogBreedsDTO: DogBreedsDTO) => {
  return dogBreedsDTO.message;
};
