import { useQuery } from '@tanstack/react-query';
import { fetchDogImageList } from '../hooks/useDogDetails/useDogDetails';
import { queryKeys } from './queryKeys';

export const useDogImageList = (breedName: string, breedVariant: string) => {
    return useQuery({
        queryKey: queryKeys.images.list(breedName, breedVariant),
        queryFn: () => fetchDogImageList(breedName, breedVariant),
        staleTime: Infinity,
        enabled: !!breedName,
    });
};
