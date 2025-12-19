import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, useMemo, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import spinnerIcon from '../../../assets/spinner.svg';
import {
    fetchDogImageList,
    fetchSingleImage,
    preloadImage,
} from '../../../hooks/useDogDetails/useDogDetails';
import { useDogVariants } from '../../../hooks';
import { NavLinkState } from '../../../types';
import { DogError } from '../DogError';
import { ImageModal } from '../ImageModal';
import { ModeNavigation } from '../ModeNavigation';
import styles from './dogDetails.module.css';

const DogDetails: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { breedName, variant } = useParams();
    const [searchParams] = useSearchParams();
    const mode = searchParams.get('mode') || 'default';
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
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        const stored = queryClient.getQueryData<number>(currentIndexKey) ?? 0;
        setCurrentIndex(stored);
    }, [breedName, variant, queryClient, currentIndexKey]);

    const currentImage = useMemo(
        () => (imageList.length > 0 ? imageList[currentIndex % imageList.length] : ''),
        [imageList, currentIndex],
    );

    const {
        data: randomImage = '',
        isLoading: isRandomLoading,
        isError: isRandomError,
    } = useQuery({
        queryKey: ['randomDogImage', breedName, variant],
        queryFn: () => fetchSingleImage(breedName || '', variant || ''),
        enabled: mode === 'random' && !!breedName,
        staleTime: 0,
    });

    const [randomImageState, setRandomImageState] = useState<string>('');
    const [randomImageKey, setRandomImageKey] = useState(0);

    useEffect(() => {
        if (randomImage) {
            setRandomImageState(randomImage);
        }
    }, [randomImage]);

    const randomMutation = useMutation({
        mutationFn: () => fetchSingleImage(breedName || '', variant || ''),
        onSuccess: async (newImage) => {
            await preloadImage(newImage);
            setRandomImageState(newImage);
            setRandomImageKey(prev => prev + 1);
        },
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

    const handleRandomClick = () => {
        randomMutation.mutate();
    };

    const { dogVariants } = useDogVariants(breedName || '');
    if (!breedName) {
        return;
    }

    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive 
            ? `${styles['tag-active']}  typography-active typography-xs` 
            : `${styles['tag']}  typography-secondary typography-xs`;

    const capitalizeFirstLetter = (word: string) => {
        return word?.charAt(0).toLocaleUpperCase() + word?.slice(1);
    };

    if (isError || (mode === 'random' && isRandomError)) {
        return <DogError />;
    }

    const renderContent = () => {
        if (mode === 'list') {
            return (
                <div className={styles['list-view']}>
                    <h2 className={`${styles['list-title']} typography-header-medium typography-bold typography-primary`}>
                        {t('headers.imageList')} - {capitalizeFirstLetter(breedName)}
                        {variant && ` ${capitalizeFirstLetter(variant)}`}
                    </h2>
                    <p className={`${styles['list-count']} -large typography-secondary`}>
                        {t('content.imageCount', { count: imageList.length })}
                    </p>
                    <div className={styles['image-grid']}>
                        {imageList.map((imageUrl, index) => (
                            <div
                                key={index}
                                className={styles['grid-item']}
                                onClick={() => setSelectedImage(imageUrl)}
                            >
                                <img
                                    src={imageUrl}
                                    alt={`${breedName} ${index + 1}`}
                                    className={styles['grid-image']}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                    {selectedImage && (
                        <ImageModal
                            imageUrl={selectedImage}
                            imageList={imageList}
                            onClose={() => setSelectedImage(null)}
                        />
                    )}
                </div>
            );
        }

        if (mode === 'random') {
            const displayImage = randomImageState || randomImage;
            const isLoading = randomMutation.isPending || (isRandomLoading && !displayImage);
            return (
                <div className={styles['random-view']}>
                    <h2 className={`${styles['random-title']} typography-header-medium typography-bold typography-primary`}>
                        {t('headers.randomImage')} - {capitalizeFirstLetter(breedName)}
                        {variant && ` ${capitalizeFirstLetter(variant)}`}
                    </h2>
                    <div className={styles['random-image-wrapper']}>
                        <div className={styles['random-image-container']}>
                            {displayImage ? (
                                <img
                                    key={randomImageKey}
                                    src={displayImage}
                                    alt="random-dog-image"
                                    className={styles['random-image']}
                                />
                            ) : (
                                <div className={styles['placeholder']} />
                            )}
                            {isLoading && (
                                <div className={styles['loader-overlay']}>
                                    <img
                                        src={spinnerIcon}
                                        alt="loading"
                                        className={styles['loader-spinner']}
                                    />
                                </div>
                            )}
                        </div>
                        <button
                            onClick={handleRandomClick}
                            className={`${styles['random-button']} primary -large typography-bold`}
                            disabled={isLoading}
                        >
                            {t('buttons.getRandom')}
                        </button>
                    </div>
                </div>
            );
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
                    {mode === 'default' && (
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
                            <div className={styles['tags-wrapper']}>
                                {dogVariants.length === 0 && (
                                    <p className={`${styles['tag']}  typography-secondary `} >
                                        {t('content.noVariants')}
                                    </p>
                                )}
                                {dogVariants.map((dogVariant) => {
                                    return (
                                        <NavLink
                                        
                                            onClick={(e) => {
                                                const target = e.target as Element;
                                                if (target.innerHTML === variant) {
                                                    e.preventDefault();
                                                    navigate(`/search/${breedName}`);
                                                }
                                            }}
                                            to={`/search/${breedName}/${dogVariant}`}
                                            className={navLinkState}
                                            
                                            key={dogVariant}
                                        >
                                            {dogVariant}
                                        </NavLink>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default DogDetails;
