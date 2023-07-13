import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { httpClient } from "../common";
import { DogDetails, DogDetailsDTO } from "../types";
import { dogDetailsMapper } from "./dogDetailsMapper";

export const useDogDetails = (breedName: string) => {
  const [dogDetails, setDogDetails] = useState<DogDetails>({
    imageSrc: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    httpClient
      .get(`/breed/${breedName}/images/random`)
      .then((response: AxiosResponse<DogDetailsDTO>) => {
        if (!response.data.code) {
          setDogDetails(dogDetailsMapper(response.data));
        } else {
          throw new Error(`${response.data.code} ${response.data.status}`);
        }
      })
      .then(() => setIsLoading(false))
      .catch((error: Error) => {
        console.error(error);
      });
  }, [breedName]);
  return { dogDetails: dogDetails, isLoading: isLoading };
};
