import { useMutation } from '@tanstack/react-query'
import { fetchSingleImage } from '../hooks/useDogDetails/useDogDetails'

export const useRandomDogImage = () => {
    return useMutation({
        mutationFn: ({
            breedName,
            breedVariant,
        }: {
            breedName: string
            breedVariant: string
        }) => fetchSingleImage(breedName, breedVariant),
    })
}
