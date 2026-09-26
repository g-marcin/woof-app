import { useQuery } from '@tanstack/react-query'
import { breedSubbreedsOptions } from '../../api/generated/@tanstack/react-query.gen'

export const useDogVariants = (breedName: string) => {
    const { data, isLoading, isError } = useQuery({
        ...breedSubbreedsOptions({ path: { breed: breedName } }),
        enabled: !!breedName,
        select: response => response.message,
    })
    return { dogVariants: data ?? [], isLoading, isError }
}
