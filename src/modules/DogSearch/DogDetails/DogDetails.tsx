import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import spinnerIcon from '../../../assets/spinner.svg';
import {
    fetchInitialImages,
    fetchSingleImage,
    MAX_QUEUE_SIZE,
    preloadImage,
} from '../../../hooks/useDogDetails/useDogDetails';
import { useDogVariants } from '../../../hooks';
import { NavLinkState } from '../../../types';
import { DogError } from '../DogError';
import styles from './dogDetails.module.css';

const DogDetails: FC = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { breedName, variant } = useParams();
    const queryClient = useQueryClient();
    const queryKey = ['dogDetails', breedName, variant];

    const {
        data: imageQueue = [],
        isError,
    } = useQuery({
        queryKey,
        queryFn: () => fetchInitialImages(breedName || '', variant || ''),
        enabled: !!breedName,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    const mutation = useMutation({
        mutationFn: () => fetchSingleImage(breedName || '', variant || ''),
        onSuccess: async (newImage) => {
            await preloadImage(newImage);
            queryClient.setQueryData<string[]>(queryKey, (old = []) => {
                const updated = [...old, newImage];
                return updated.length > MAX_QUEUE_SIZE
                    ? updated.slice(-MAX_QUEUE_SIZE)
                    : updated;
            });
        },
    });

    const currentImage = useMemo(
        () => (imageQueue.length > 0 ? imageQueue[imageQueue.length - 1] : ''),
        [imageQueue],
    );

    const { dogVariants } = useDogVariants(breedName || '');
    if (!breedName) {
        return;
    }

    const capitalizeFirstLetter = (word: string) => {
        return word?.charAt(0).toLocaleUpperCase() + word?.slice(1);
    };

    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive ? styles['tag-active'] : styles['tag'];

    return (
        <>
            {isError ? (
                <DogError />
            ) : (
                <div className={styles['main-wrapper']}>
                    <div className={styles['image-wrapper']}>
                        <div className={styles['image-container']}>
                            {currentImage && (
                                <img
                                    key={imageQueue.length}
                                    src={currentImage}
                                    alt="dog-image"
                                    className={styles['details-avatar']}
                                    onClick={() => mutation.mutate()}
                                />
                            )}
                            {mutation.isPending && (
                                <div className={styles['loader-overlay']}>
                                    <img
                                        src={spinnerIcon}
                                        alt="loading"
                                        className={styles['loader-spinner']}
                                    />
                                </div>
                            )}
                        </div>
                        <div className={styles['avatar-description']}>
                            {t('buttons.clickMe')}
                        </div>
                    </div>
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
                            <p className={styles['tag']}>
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
                </div>
            )}
        </>
    );
};

export default DogDetails;
