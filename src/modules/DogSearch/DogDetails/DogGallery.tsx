import { FC, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DogVariantsTags } from '../../../components/DogVariantTags/DogVariantsTags';
import { NavLinkState } from '../../../types';
import { useDogVariants } from '../../../hooks';
import { ImageModal } from '../ImageModal';
import tagStyles from '../../../components/DogVariantTags/dogVariantTags.module.css';
import { ModeType } from './constants';
import styles from './dogDetails.module.css';

const IMAGES_PER_PAGE = 10;

interface DogGalleryProps {
    imageList: string[];
    mode: string;
}

export const DogGallery: FC<DogGalleryProps> = ({ imageList, mode }) => {
    const { t } = useTranslation();
    const { breedName, variant } = useParams();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [displayedCount, setDisplayedCount] = useState(IMAGES_PER_PAGE);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);
    const { dogVariants } = useDogVariants(breedName || '');

    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive 
            ? `${tagStyles['tag-active']}  typography-active typography-xs` 
            : `${tagStyles['tag']}  typography-secondary typography-xs`;

    useEffect(() => {
        setDisplayedCount(IMAGES_PER_PAGE);
        setIsLoadingMore(false);
    }, [breedName, variant]);

    useEffect(() => {
        if (!sentinelRef.current || displayedCount >= imageList.length || mode !== ModeType.GALLERY) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isLoadingMore) {
                    setIsLoadingMore(true);
                    setTimeout(() => {
                        setDisplayedCount((prev) => Math.min(prev + IMAGES_PER_PAGE, imageList.length));
                        setIsLoadingMore(false);
                    }, 2000);
                }
            },
            { threshold: 0.1 }
        );

        observer.observe(sentinelRef.current);

        return () => {
            observer.disconnect();
        };
    }, [displayedCount, imageList.length, mode, isLoadingMore]);

    const capitalizeFirstLetter = (word: string | undefined) => {
        if (!word) return '';
        return word.charAt(0).toLocaleUpperCase() + word.slice(1);
    };

    const displayedImages = imageList.slice(0, displayedCount);
    return (
        <div className={styles['gallery-view']}>
            
            <h2 className={`${styles['gallery-title']} typography-header-medium typography-bold typography-primary`}>
                {t('headers.imageList')} - {capitalizeFirstLetter(breedName)}
                {variant && ` ${capitalizeFirstLetter(variant)}`}
            </h2>
            <p className={`${styles['gallery-count']} -large typography-secondary`}>
                {t('content.imageCount', { count: imageList.length })}
            </p>
            <>
            {breedName && (
                <DogVariantsTags
                    dogVariants={dogVariants}
                    breedName={breedName}
                    navLinkState={navLinkState}
                />
            )}
            <div className={styles['image-grid']}>
        
                {displayedImages.map((imageUrl, index) => (
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
                {isLoadingMore &&
                    Array.from({ length: Math.min(IMAGES_PER_PAGE, imageList.length - displayedCount) }).map(
                        (_, index) => (
                            <div key={`skeleton-${index}`} className={styles['skeleton-item']}>
                                <div className={styles['skeleton-shimmer']} />
                            </div>
                        )
                    )}
            </div>
            </>
            {displayedCount < imageList.length && (
                <div ref={sentinelRef} className={styles['sentinel']} />
            )}
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

