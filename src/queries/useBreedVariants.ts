import { useQuery } from '@tanstack/react-query';
import { httpClient } from '../common';
import { DogVariantsDTO, DogVariants } from '../types';
import { dogVariantsMapper } from '../hooks/useDogVariants/dogVariantsMapper';
import { queryKeys } from './queryKeys';

const fetchBreedVariants = async (breedName: string): Promise<DogVariants> => {
    if (!breedName) {
        return [];
    }

    const response = await httpClient.get<DogVariantsDTO>(
        `/breed/${breedName}/list`,
    );

    if (response.data.code) {
        throw new Error(`${response.data.code} ${response.data.status}`);
    }

    return dogVariantsMapper(response.data);
};

export const useBreedVariants = (breedName: string) => {
    return useQuery({
        queryKey: queryKeys.breeds.variants(breedName),
        queryFn: () => fetchBreedVariants(breedName),
        enabled: !!breedName,
    });
};
