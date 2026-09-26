import { useQuery } from '@tanstack/react-query'
import { apiGetMessage } from '../../common'
import { queryKeys } from '../../queries/queryKeys'
import type { DogVariants } from '../../types'

const fetchDogVariants = (
    breedName: string,
    signal?: AbortSignal
): Promise<DogVariants> =>
    apiGetMessage('/breed/{breed}/list', { path: { breed: breedName }, signal })

export const useDogVariants = (breedName: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.breeds.variants(breedName),
        queryFn: ({ signal }) => fetchDogVariants(breedName, signal),
        enabled: !!breedName,
    })
    return { dogVariants: data ?? [], isLoading, isError }
}
