import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { httpClient } from "../common";
import { DogList, DogListDTO } from "../types";
import { dogListMapper } from "./dogListMapper";

export const useDogList = () => {
  const [dogList, setDogList] = useState<DogList>([""]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    httpClient
      .get(`/breeds/list/all`)
      .then((response: AxiosResponse<DogListDTO>) => {
        if (!response.data.code) {
          setDogList(dogListMapper(response.data));
        } else {
          throw new Error(`${response.data.code} ${response.data.status}`);
        }
      })
      .then(() => setIsLoading(false))
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);
  return { dogList: dogList, isLoading: isLoading };
};
