import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { httpClient } from '../../common'

interface DescriptionDTO {
    status: string
    message: {
        breed: string
        variant?: string
        description_en: string
        description_pl: string
    }
}

const fetchBreedDescription = async (
    breedName: string
): Promise<DescriptionDTO['message']> => {
    const response = await httpClient.get<DescriptionDTO>(
        `/breed/${breedName}/description`
    )
    if (response.data.status === 'success') {
        return response.data.message
    }
    throw new Error('Failed to fetch breed description')
}

const fetchVariantDescription = async (
    breedName: string,
    variant: string
): Promise<DescriptionDTO['message']> => {
    const response = await httpClient.get<DescriptionDTO>(
        `/breed/${breedName}/${variant}/description`
    )
    if (response.data.status === 'success') {
        return response.data.message
    }
    throw new Error('Failed to fetch variant description')
}

export const useDogDescription = (breedName: string, variant?: string) => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language as 'en' | 'pl'

    const {
        data: breedDescription,
        isLoading: isBreedLoading,
        isError: isBreedError,
    } = useQuery({
        queryKey: ['breedDescription', breedName],
        queryFn: () => fetchBreedDescription(breedName),
        enabled: !!breedName,
        staleTime: Infinity,
        gcTime: Infinity,
    })

    const {
        data: variantDescription,
        isLoading: isVariantLoading,
        isError: isVariantError,
    } = useQuery({
        queryKey: ['variantDescription', breedName, variant],
        queryFn: () => fetchVariantDescription(breedName, variant!),
        enabled: !!breedName && !!variant,
        staleTime: Infinity,
        gcTime: Infinity,
    })

    const getDescription = (): string | undefined => {
        const descriptionData = variant ? variantDescription : breedDescription
        if (!descriptionData) return undefined

        return currentLang === 'en'
            ? descriptionData.description_en
            : descriptionData.description_pl
    }

    return {
        description: getDescription(),
        isLoading: variant ? isVariantLoading : isBreedLoading,
        isError: variant ? isVariantError : isBreedError,
        breedDescription,
        variantDescription,
    }
}
