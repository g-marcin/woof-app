import { FC, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { DogVariantsTags } from '../../components/DogVariantTags/DogVariantsTags';
import { useDogVariants } from '../../hooks';
import { ImageModal } from '../DogSearch/ImageModal';
import { ModeType } from './constants';

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
        <div className="w-full">
            
            <h2 className="text-center mb-4 typography-header-medium typography-bold typography-primary">
                {t('headers.imageList')} - {capitalizeFirstLetter(breedName)}
                {variant && ` ${capitalizeFirstLetter(variant)}`}
            </h2>
            <p className="text-center mb-5 -large typography-secondary">
                {t('content.imageCount', { count: imageList.length })}
            </p>
            <>
            {breedName && (
                <DogVariantsTags
                    dogVariants={dogVariants}
                    breedName={breedName}
                />
            )}
            <div className="flex flex-wrap gap-4 py-5 max-md:gap-2.5">
        
                {displayedImages.map((imageUrl, index) => (
                    <div
                        key={index}
                        className="relative flex-[1_1_calc(25%-12px)] min-w-[200px] pt-[calc(25%-12px)] overflow-hidden rounded-lg bg-[color:var(--secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.1)] cursor-pointer transition-opacity duration-300 hover:opacity-80 max-md:flex-[1_1_calc(50%-8px)] max-md:pt-[calc(50%-8px)] max-sm:flex-[1_1_100%] max-sm:pt-[100%]"
                        onClick={() => setSelectedImage(imageUrl)}
                    >
                        <img
                            src={imageUrl}
                            alt={`${breedName} ${index + 1}`}
                            className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-300"
                            loading="lazy"
                        />
                    </div>
                ))}
                {isLoadingMore &&
                    Array.from({ length: Math.min(IMAGES_PER_PAGE, imageList.length - displayedCount) }).map(
                        (_, index) => (
                            <div key={`skeleton-${index}`} className="relative flex-[1_1_calc(25%-12px)] min-w-[200px] pt-[calc(25%-12px)] overflow-hidden rounded-lg bg-[color:var(--secondary)] shadow-[0_2px_8px_rgba(0,0,0,0.1)] max-md:flex-[1_1_calc(50%-8px)] max-md:pt-[calc(50%-8px)] max-sm:flex-[1_1_100%] max-sm:pt-[100%]">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[var(--secondary)] via-white/10 to-[var(--secondary)] bg-[length:200%_100%] animate-shimmer" />
                            </div>
                        )
                    )}
            </div>
            </>
            {displayedCount < imageList.length && (
                <div ref={sentinelRef} className="h-5 w-full" />
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

