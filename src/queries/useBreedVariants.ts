import { useQuery } from '@tanstack/react-query'
import type { components } from '@mgrzmil-org/api-types'
import { httpClient } from '../common'
import { DogVariants } from '../types'
import { dogVariantsMapper } from '../hooks/useDogVariants/dogVariantsMapper'
import { queryKeys } from './queryKeys'

type DogVariantsResponse = components['schemas']['APIResponse_List_str__']

const fetchBreedVariants = async (breedName: string): Promise<DogVariants> => {
    if (!breedName) {
        return []
    }

    const response = await httpClient.get<DogVariantsResponse>(
        `/breed/${breedName}/list`
    )

    if (response.data.status !== 'success') {
        throw new Error(
            `Failed to fetch breed variants: ${response.data.status}`
        )
    }

    return dogVariantsMapper(response.data)
}

export const useBreedVariants = (breedName: string) => {
    return useQuery({
        queryKey: queryKeys.breeds.variants(breedName),
        queryFn: () => fetchBreedVariants(breedName),
        enabled: !!breedName,
    })
}
