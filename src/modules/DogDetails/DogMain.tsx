import { useQuery, useQueryClient } from '@tanstack/react-query'
import { FC, useMemo, useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useParams, useSearchParams } from 'react-router-dom'
import {
    fetchDogImageList,
    fetchSingleImage,
    preloadImage,
} from '../../hooks/useDogDetails/useDogDetails'
import { useDogVariants } from '../../hooks'
import { DogError } from '../DogSearch/DogError/DogError'
import { ModeNavigation } from '../DogSearch/ModeNavigation'
import { DogGallery } from './DogGallery'
import { DogRandom } from './DogRandom'
import { DogVariantsTags } from '../../components/DogVariantTags/DogVariantsTags'
import { ModeType } from './constants'
import { Loader } from '../../components'

const DogMain: FC = () => {
    const { t } = useTranslation()
    const { breedName, variant } = useParams()
    const [searchParams] = useSearchParams()
    const mode = searchParams.get('mode') || ModeType.DETAILS
    const queryClient = useQueryClient()
    const queryKey = ['dogImageList', breedName, variant]
    const currentIndexKey = ['dogImageIndex', breedName, variant]

    const { data: imageList = [], isError } = useQuery({
        queryKey,
        queryFn: () => fetchDogImageList(breedName || '', variant || ''),
        enabled: !!breedName,
        staleTime: Infinity,
        gcTime: Infinity,
    })

    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        const stored = queryClient.getQueryData<number>(currentIndexKey) ?? 0
        setCurrentIndex(stored)
    }, [breedName, variant, queryClient, currentIndexKey])

    const currentImage = useMemo(
        () =>
            imageList.length > 0
                ? imageList[currentIndex % imageList.length]
                : '',
        [imageList, currentIndex]
    )

    const { isError: isRandomError } = useQuery({
        queryKey: ['randomDogImage', breedName, variant],
        queryFn: () => fetchSingleImage(breedName || '', variant || ''),
        enabled: mode === ModeType.RANDOM && !!breedName,
        staleTime: 0,
    })

    const handleImageClick = () => {
        if (imageList.length === 0) return
        const nextIndex = (currentIndex + 1) % imageList.length
        setCurrentIndex(nextIndex)
        queryClient.setQueryData<number>(currentIndexKey, nextIndex)
        if (imageList.length > nextIndex + 1) {
            preloadImage(imageList[(nextIndex + 1) % imageList.length])
        }
    }

    const { dogVariants } = useDogVariants(breedName || '')
    if (!breedName) {
        return
    }

    const capitalizeFirstLetter = (word: string) => {
        return word?.charAt(0).toLocaleUpperCase() + word?.slice(1)
    }

    if (isError || (mode === ModeType.RANDOM && isRandomError)) {
        return <DogError />
    }

    const renderContent = () => {
        if (mode === ModeType.GALLERY) {
            return <DogGallery imageList={imageList} mode={mode} />
        }

        if (mode === ModeType.RANDOM) {
            return <DogRandom />
        }

        return (
            <>
                <div className="z-0 text-center text-white">
                    <div className="relative inline-block w-[258px] h-[258px] min-h-[258px]">
                        {currentImage && (
                            <img
                                key={currentIndex}
                                src={currentImage}
                                alt="dog-image"
                                className="w-[250px] h-[250px] rounded-full object-cover cursor-pointer p-1 bg-[color:var(--secondary)] transition-opacity duration-300 ease-in-out hover:blur-[4px]"
                                onClick={handleImageClick}
                            />
                        )}
                        {imageList.length === 0 && <Loader />}
                    </div>
                    <div className="text-[color:var(--secondary)] typography-bold">
                        {t('buttons.clickMe')}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            {isError ? (
                <DogError />
            ) : (
                <div className="flex flex-col min-h-fit gap-2.5 max-w-[1200px] mx-auto px-5 pb-[100px]">
                    <ModeNavigation />
                    {renderContent()}
                    {mode === ModeType.DETAILS && (
                        <>
                            <div className="text-justify items-center">
                                <h1>{capitalizeFirstLetter(breedName)}:</h1>
                                <p>{t('content.dogDescription1')}</p>
                                <p>{t('content.dogDescription2')}</p>
                            </div>
                            <h1>
                                {capitalizeFirstLetter(breedName)}{' '}
                                {t('headers.variants')}
                            </h1>
                            <DogVariantsTags
                                dogVariants={dogVariants}
                                breedName={breedName}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    )
}

export default DogMain
