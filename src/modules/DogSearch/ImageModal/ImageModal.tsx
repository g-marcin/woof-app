import { FC, useEffect, useState, useCallback } from 'react';
import styles from './imageModal.module.css';

interface ImageModalProps {
    imageUrl: string;
    imageList?: string[];
    onClose: () => void;
}

export const ImageModal: FC<ImageModalProps> = ({ imageUrl, imageList, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (imageList) {
            const index = imageList.indexOf(imageUrl);
            if (index !== -1) {
                setCurrentIndex(index);
            }
        }
    }, [imageUrl, imageList]);

    const handlePrevious = useCallback(() => {
        if (imageList && imageList.length > 0) {
            setCurrentIndex((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
        }
    }, [imageList]);

    const handleNext = useCallback(() => {
        if (imageList && imageList.length > 0) {
            setCurrentIndex((prev) => (prev + 1) % imageList.length);
        }
    }, [imageList]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            } else if (imageList && imageList.length > 0) {
                if (e.key === 'ArrowLeft') {
                    handlePrevious();
                } else if (e.key === 'ArrowRight') {
                    handleNext();
                }
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [handlePrevious, handleNext, imageList, onClose]);

    const displayImage = imageList && imageList.length > 0 ? imageList[currentIndex] : imageUrl;
    const showArrows = imageList && imageList.length > 1;

    return (
        <div className={styles['modal-overlay']} onClick={onClose}>
            <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
                <button className={`${styles['close-button']} typography-bold typography-primary`} style={{ fontSize: '28px' }} onClick={onClose}>
                    ×
                </button>
                {showArrows && (
                    <>
                        <button
                            className={`${styles['nav-button']} typography-bold typography-primary`}
                            style={{ fontSize: '36px' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevious();
                            }}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            className={`${styles['nav-button']} ${styles['nav-button-right']} typography-bold typography-primary`}
                            style={{ fontSize: '36px' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleNext();
                            }}
                            aria-label="Next image"
                        >
                            ›
                        </button>
                    </>
                )}
                <img src={displayImage} alt="zoomed" className={styles['modal-image']} />
            </div>
        </div>
    );
};

