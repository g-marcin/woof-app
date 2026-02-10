import { useMutation, useQuery } from '@tanstack/react-query'
import { FC, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import { DogVariantsTags } from '../../components/DogVariantTags/DogVariantsTags'
import { useDogVariants } from '../../hooks'
import {
    fetchSingleImage,
    preloadImage,
} from '../../hooks/useDogDetails/useDogDetails'
import { Loader } from '../../components/Loader'

export const DogRandom: FC = () => {
    const { t } = useTranslation()
    const { breedName, variant } = useParams()
    const { dogVariants } = useDogVariants(breedName || '')

    const { data: randomImage = '', isLoading: isRandomLoading } = useQuery({
        queryKey: ['randomDogImage', breedName, variant],
        queryFn: () => fetchSingleImage(breedName || '', variant || ''),
        enabled: !!breedName,
        staleTime: 0,
    })

    const [randomImageState, setRandomImageState] = useState<string>('')
    const [randomImageKey, setRandomImageKey] = useState(0)

    useEffect(() => {
        if (randomImage) {
            setRandomImageState(randomImage)
        }
    }, [randomImage])

    const randomMutation = useMutation({
        mutationFn: () => fetchSingleImage(breedName || '', variant || ''),
        onSuccess: async newImage => {
            await preloadImage(newImage)
            setRandomImageState(newImage)
            setRandomImageKey(prev => prev + 1)
        },
    })

    const handleRandomClick = () => {
        randomMutation.mutate()
    }

    const capitalizeFirstLetter = (word: string | undefined) => {
        if (!word) return ''
        return word.charAt(0).toLocaleUpperCase() + word.slice(1)
    }

    const displayImage = randomImageState || randomImage
    const isLoading =
        randomMutation.isPending || (isRandomLoading && !displayImage)

    return (
        <div className="w-full">
            <h2 className="text-center mb-4 typography-header-medium typography-bold typography-primary">
                {t('headers.randomImage')} - {capitalizeFirstLetter(breedName)}
                {variant && ` ${capitalizeFirstLetter(variant)}`}
            </h2>
            <div className="flex flex-col items-center gap-5 w-full mx-auto">
                {breedName && (
                    <DogVariantsTags
                        dogVariants={dogVariants}
                        breedName={breedName}
                    />
                )}
                <div className="relative w-full max-w-[800px] aspect-square rounded-xl overflow-hidden bg-[color:var(--secondary)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] mx-auto">
                    {displayImage ? (
                        <img
                            key={randomImageKey}
                            src={displayImage}
                            alt="random-dog-image"
                            className="w-full h-full object-cover transition-opacity duration-300"
                        />
                    ) : (
                        <div className="w-full h-full bg-[color:var(--secondary)]" />
                    )}
                    {isLoading && <Loader />}
                </div>
                <button
                    onClick={handleRandomClick}
                    className="text-[color:var(--typography-secondary)] hover:not-disabled:opacity-80 hover:not-disabled:shadow-[0_4px_12px_rgba(0,0,0,0.15)] disabled:opacity-60 disabled:cursor-not-allowed primary -large typography-bold"
                    disabled={isLoading}
                >
                    {t('buttons.getRandom')}
                </button>
            </div>
        </div>
    )
}
