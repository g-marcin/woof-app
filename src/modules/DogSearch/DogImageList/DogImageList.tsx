import { useQuery } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Loader } from '../../../components';
import { fetchDogImageList } from '../../../hooks/useDogDetails/useDogDetails';
import { DogError } from '../DogError';
import { ImageModal } from '../ImageModal';
import styles from './dogImageList.module.css';

const DogImageList: FC = () => {
    const { t } = useTranslation();
    const { breedName, variant } = useParams();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const queryKey = ['dogImageList', breedName, variant];

    const {
        data: imageList = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey,
        queryFn: () => fetchDogImageList(breedName || '', variant || ''),
        enabled: !!breedName,
        staleTime: Infinity,
        gcTime: Infinity,
    });

    const capitalizeFirstLetter = (word: string) => {
        return word?.charAt(0).toLocaleUpperCase() + word?.slice(1);
    };

    if (!breedName) {
        return null;
    }

    if (isLoading) {
        return <Loader />;
    }

    if (isError) {
        return <DogError />;
    }

    return (
        <div className={styles['main-wrapper']}>
            <h1 className={`${styles['title']} typography-header-large typography-bold typography-primary`}>
                {capitalizeFirstLetter(breedName)}
                {variant && ` ${capitalizeFirstLetter(variant)}`} -{' '}
                {t('headers.imageList')}
            </h1>
            <p className={`${styles['count']} -large typography-secondary`}>
                {t('content.imageCount', { count: imageList.length })}
            </p>
            <div className={styles['image-grid']}>
                {imageList.map((imageUrl, index) => (
                    <div
                        key={index}
                        className={styles['image-item']}
                        onClick={() => setSelectedImage(imageUrl)}
                    >
                        <img
                            src={imageUrl}
                            alt={`${breedName} ${index + 1}`}
                            className={styles['image']}
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
};

export default DogImageList;

