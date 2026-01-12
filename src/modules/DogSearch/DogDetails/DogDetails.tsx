import { useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import spinnerIcon from '@assets/spinner.svg';
import {
    fetchDogImageList,
    fetchSingleImage,
    preloadImage,
} from '../../../hooks/useDogDetails/useDogDetails';
import { useDogVariants } from '../../../hooks';
import { NavLinkState } from '../../../types';
import { DogError } from '../DogError';
import { ModeNavigation } from '../ModeNavigation';
import { DogGallery } from './DogGallery';
import { DogRandom } from './DogRandom';
import { DogVariantsTags } from '../../../components/DogVariantTags/DogVariantsTags';
import tagStyles from '../../../components/DogVariantTags/dogVariantTags.module.css';
import { ModeType } from './constants';
import styles from './dogDetails.module.css';

const DogDetails: FC = () => {
    const { t } = useTranslation();
    const { breedName, variant } = useParams();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || ModeType.DETAILS;
    const queryClient = useQueryClient();
    const queryKey = ['dogImageList', breedName, variant];
    const currentIndexKey = ['dogImageIndex', breedName, variant];

    const {
        data: imageList = [],
        isError,
    } = useQuery({
        queryKey,
        queryFn: () => fetchDogImageList(breedName || '', variant || ''),
        enabled: !!breedName,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const stored = queryClient.getQueryData<number>(currentIndexKey) ?? 0;
        setCurrentIndex(stored);
    }, [breedName, variant, queryClient, currentIndexKey]);


    const currentImage = useMemo(
        () => (imageList.length > 0 ? imageList[currentIndex % imageList.length] : ''),
        [imageList, currentIndex],
    );

    const {
        isError: isRandomError,
    } = useQuery({
        queryKey: ['randomDogImage', breedName, variant],
        queryFn: () => fetchSingleImage(breedName || '', variant || ''),
        enabled: mode === ModeType.RANDOM && !!breedName,
        staleTime: 0,
    });

    const handleImageClick = () => {
        if (imageList.length === 0) return;
        const nextIndex = (currentIndex + 1) % imageList.length;
        setCurrentIndex(nextIndex);
        queryClient.setQueryData<number>(currentIndexKey, nextIndex);
        if (imageList.length > nextIndex + 1) {
            preloadImage(imageList[(nextIndex + 1) % imageList.length]);
        }
    };

    const { dogVariants } = useDogVariants(breedName || '');
    if (!breedName) {
        return;
    }

    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive 
            ? `${tagStyles['tag-active']}  typography-active typography-xs` 
            : `${tagStyles['tag']}  typography-secondary typography-xs`;

    const capitalizeFirstLetter = (word: string) => {
        return word?.charAt(0).toLocaleUpperCase() + word?.slice(1);
    };

    if (isError || (mode === ModeType.RANDOM && isRandomError)) {
        return <DogError />;
    }

    const renderContent = () => {
        if (mode === ModeType.GALLERY) {
            return <DogGallery imageList={imageList} mode={mode} />;
        }

        if (mode === ModeType.RANDOM) {
            return <DogRandom />;
        }

        return (
            <>
                <div className={styles['image-wrapper']}>
                    <div className={styles['image-container']}>
                        {currentImage && (
                            <img
                                key={currentIndex}
                                src={currentImage}
                                alt="dog-image"
                                className={styles['details-avatar']}
                                onClick={handleImageClick}
                            />
                        )}
                        {imageList.length === 0 && (
                            <div className={styles['loader-overlay']}>
                                <img
                                    src={spinnerIcon}
                                    alt="loading"
                                    className={styles['loader-spinner']}
                                />
                            </div>
                        )}
                    </div>
                    <div className={`${styles['avatar-description']}  typography-bold`}>
                        {t('buttons.clickMe')}
                    </div>
                </div>
            </>
        );
    };

    return (
        <>
            {isError ? (
                <DogError />
            ) : (
                <div className={styles['main-wrapper']}>
                    <ModeNavigation />
                    {renderContent()}
                    {mode === ModeType.DETAILS && (
                        <>
                            <div className={styles['description-wrapper']}>
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
                                navLinkState={navLinkState}
                            />
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default DogDetails;
