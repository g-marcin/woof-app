import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import spinnerIcon from '@assets/spinner.svg';
import { fetchSingleImage, preloadImage } from '../../../hooks/useDogDetails/useDogDetails';
import { DogError } from '../DogError';
import styles from './randomDogImage.module.css';

const RandomDogImage: FC = () => {
    const { t } = useTranslation();
    const { breedName, variant } = useParams();
    const [imageKey, setImageKey] = useState(0);
    const [currentImage, setCurrentImage] = useState<string>('');

    const {
        data: initialImage = '',
        isLoading: isInitialLoading,
        isError,
    } = useQuery({
        queryKey: ['randomDogImage', breedName, variant],
        queryFn: () => fetchSingleImage(breedName || '', variant || ''),
        enabled: true,
        staleTime: 0,
    });

    useEffect(() => {
        if (initialImage) {
            setCurrentImage(initialImage);
        }
    }, [initialImage]);

    const mutation = useMutation({
        mutationFn: () => fetchSingleImage(breedName || '', variant || ''),
        onSuccess: async (newImage) => {
            await preloadImage(newImage);
            setCurrentImage(newImage);
            setImageKey(prev => prev + 1);
        },
    });

    const handleRandomClick = () => {
        mutation.mutate();
    };

    const capitalizeFirstLetter = (word: string) => {
        return word?.charAt(0).toLocaleUpperCase() + word?.slice(1);
    };

    if (isError) {
        return <DogError />;
    }

    const isLoading = mutation.isPending || (isInitialLoading && !currentImage);

    return (
        <div className={styles['main-wrapper']}>
            <h1 className={`${styles['title']} typography-header-large typography-bold typography-primary`}>
                {t('headers.randomImage')}
                {breedName && ` - ${capitalizeFirstLetter(breedName)}`}
                {variant && ` ${capitalizeFirstLetter(variant)}`}
            </h1>
            <div className={styles['image-wrapper']}>
                <div className={styles['image-container']}>
                    {currentImage ? (
                        <img
                            key={imageKey}
                            src={currentImage}
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

export default RandomDogImage;

