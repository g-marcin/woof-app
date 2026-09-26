import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { apiGetMessage } from '../../common'
import type { components } from '@mgrzmil-org/api-types'

type DescriptionMessage = components['schemas']['DescriptionMessage']

const fetchBreedDescription = (
    breedName: string,
    signal?: AbortSignal
): Promise<DescriptionMessage> =>
    apiGetMessage('/breed/{breed}/description', {
        path: { breed: breedName },
        signal,
    })

const fetchVariantDescription = (
    breedName: string,
    variant: string,
    signal?: AbortSignal
): Promise<DescriptionMessage> =>
    apiGetMessage('/breed/{breed}/{variant}/description', {
        path: { breed: breedName, variant },
        signal,
    })

export const useDogDescription = (breedName: string, variant?: string) => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language as 'en' | 'pl'

    const {
        data: breedDescription,
        isLoading: isBreedLoading,
        isError: isBreedError,
    } = useQuery({
        queryKey: ['breedDescription', breedName],
        queryFn: ({ signal }) => fetchBreedDescription(breedName, signal),
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
        queryFn: ({ signal }) =>
            fetchVariantDescription(breedName, variant ?? '', signal),
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
