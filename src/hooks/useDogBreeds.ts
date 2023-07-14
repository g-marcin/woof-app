import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { httpClient } from "../common";
import { DogBreeds, DogBreedsDTO } from "../types";
import { dogBreedsMapper } from "./dogBreedsMapper";

export const useDogBreeds = (breedName: string) => {
  const [dogBreeds, setDogBreeds] = useState<DogBreeds>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    httpClient
      .get(`/breed/${breedName}/list`)
      .then((response: AxiosResponse<DogBreedsDTO>) => {
        if (!response.data.code) {
          setIsError(false);
          setDogBreeds(dogBreedsMapper(response.data));
        } else {
          throw new Error(`${response.data.code} ${response.data.status}`);
        }
      })
      .then(() => setIsLoading(false))
      .catch((error: Error) => {
        console.error(error);
        setIsError(true);
      });
  }, [breedName]);
  return { dogBreeds: dogBreeds, isLoading: isLoading, isError: isError };
};
