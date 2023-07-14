import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { httpClient } from "../../common";
import { DogVariants, DogVariantsDTO } from "../../types";
import { dogVariantsMapper } from "./dogVariantsMapper";

export const useDogVariants = (breedName: string) => {
  const [dogVariants, setDogVariants] = useState<DogVariants>([""]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    setIsLoading(true);

    httpClient
      .get(`/breed/${breedName}/list`)
      .then((response: AxiosResponse<DogVariantsDTO>) => {
        if (!response.data.code) {
          setIsError(false);
          setDogVariants(dogVariantsMapper(response.data));
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
  return { dogVariants: dogVariants, isLoading: isLoading, isError: isError };
};
