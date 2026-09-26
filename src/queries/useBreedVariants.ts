import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../common'
import { DogVariants } from '../types'
import { dogVariantsMapper } from '../hooks/useDogVariants/dogVariantsMapper'
import { queryKeys } from './queryKeys'

const fetchBreedVariants = async (breedName: string): Promise<DogVariants> => {
    if (!breedName) {
        return []
    }

    const data = await apiGet('/breed/{breed}/list', { breed: breedName })

    if (data.status !== 'success') {
        throw new Error(`Failed to fetch breed variants: ${data.status}`)
    }

    return dogVariantsMapper(data)
}

export const useBreedVariants = (breedName: string) => {
    return useQuery({
        queryKey: queryKeys.breeds.variants(breedName),
        queryFn: () => fetchBreedVariants(breedName),
        enabled: !!breedName,
    })
}
