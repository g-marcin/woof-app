import { FC, useEffect, useState, useCallback } from 'react';

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
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1000] p-5" onClick={onClose}>
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                <button className="absolute top-2.5 right-2.5 bg-white/90 border-none rounded-full w-10 h-10 cursor-pointer flex items-center justify-center transition-all duration-300 z-[1001] hover:bg-white hover:opacity-90 typography-bold typography-primary text-[28px]" onClick={onClose}>
                    ×
                </button>
                {showArrows && (
                    <>
                        <button
                            className="absolute top-1/2 left-5 -translate-y-1/2 bg-white/90 border-none rounded-full w-[50px] h-[50px] cursor-pointer flex items-center justify-center transition-all duration-300 z-[1001] leading-none hover:bg-white hover:opacity-90 max-md:w-10 max-md:h-10 max-md:left-2.5 typography-bold typography-primary text-4xl"
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePrevious();
                            }}
                            aria-label="Previous image"
                        >
                            ‹
                        </button>
                        <button
                            className="absolute top-1/2 right-5 -translate-y-1/2 bg-white/90 border-none rounded-full w-[50px] h-[50px] cursor-pointer flex items-center justify-center transition-all duration-300 z-[1001] leading-none hover:bg-white hover:opacity-90 max-md:w-10 max-md:h-10 max-md:right-2.5 typography-bold typography-primary text-4xl"
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
                <img src={displayImage} alt="zoomed" className="max-w-full max-h-[90vh] object-contain rounded-lg" />
            </div>
        </div>
    );
};

