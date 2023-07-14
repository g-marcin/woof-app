import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { httpClient } from "../../common";
import { DogEntries, DogListDTO } from "../../types";
import { dogListMapper } from "./dogListMapper";

export const useDogList = () => {
  const [dogEntries, setDogEntries] = useState<DogEntries>([["", [""]]]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    httpClient
      .get(`/breeds/list/all`)
      .then((response: AxiosResponse<DogListDTO>) => {
        if (!response.data.code) {
          setDogEntries(dogListMapper(response.data));
        } else {
          if (!response.data.status) {
            return;
          }
          throw new Error(`${response.data.code} ${response.data.status}`);
        }
      })
      .then(() => setIsLoading(false))
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);
  return { dogEntries: dogEntries, isLoading: isLoading };
};
