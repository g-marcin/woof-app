import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DogVariantsTags } from '../../../components/DogVariantTags/DogVariantsTags';
import { NavLinkState } from '../../../types';
import { useDogVariants } from '../../../hooks';
import spinnerIcon from '../../../assets/spinner.svg';
import { fetchSingleImage, preloadImage } from '../../../hooks/useDogDetails/useDogDetails';
import tagStyles from '../../../components/DogVariantTags/dogVariantTags.module.css';
import styles from './dogDetails.module.css';

export const DogRandom: FC = () => {
    const { t } = useTranslation();
    const { breedName, variant } = useParams();
    const { dogVariants } = useDogVariants(breedName || '');

    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive 
            ? `${tagStyles['tag-active']}  typography-active typography-xs` 
            : `${tagStyles['tag']}  typography-secondary typography-xs`;

    const {
        data: randomImage = '',
        isLoading: isRandomLoading,
    } = useQuery({
        queryKey: ['randomDogImage', breedName, variant],
        queryFn: () => fetchSingleImage(breedName || '', variant || ''),
        enabled: !!breedName,
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

    const handleRandomClick = () => {
        randomMutation.mutate();
    };

    const capitalizeFirstLetter = (word: string | undefined) => {
        if (!word) return '';
        return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    };

    const displayImage = randomImageState || randomImage;
    const isLoading = randomMutation.isPending || (isRandomLoading && !displayImage);

    return (
        <div className={styles['random-view']}>
            <h2 className={`${styles['random-title']} typography-header-medium typography-bold typography-primary`}>
                {t('headers.randomImage')} - {capitalizeFirstLetter(breedName)}
                {variant && ` ${capitalizeFirstLetter(variant)}`}
            </h2>
            <div className={styles['random-image-wrapper']}>
            {breedName && (
                <DogVariantsTags
                    dogVariants={dogVariants}
                    breedName={breedName}
                    navLinkState={navLinkState}
                />
            )}
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
};

