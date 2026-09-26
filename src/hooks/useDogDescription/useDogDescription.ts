import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import {
    breedDescriptionOptions,
    variantDescriptionOptions,
} from '../../api/generated/@tanstack/react-query.gen'

export const useDogDescription = (breedName: string, variant?: string) => {
    const { i18n } = useTranslation()
    const currentLang = i18n.language as 'en' | 'pl'

    const {
        data: breedDescription,
        isLoading: isBreedLoading,
        isError: isBreedError,
    } = useQuery({
        ...breedDescriptionOptions({ path: { breed: breedName } }),
        select: response => response.message,
        enabled: !!breedName,
        staleTime: Infinity,
        gcTime: Infinity,
    })

    const {
        data: variantDescription,
        isLoading: isVariantLoading,
        isError: isVariantError,
    } = useQuery({
        ...variantDescriptionOptions({
            path: { breed: breedName, variant: variant ?? '' },
        }),
        select: response => response.message,
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
