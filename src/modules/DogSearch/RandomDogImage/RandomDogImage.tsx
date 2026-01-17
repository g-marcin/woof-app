import { useMutation, useQuery } from '@tanstack/react-query';
import { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Spinner } from '@assets/svg/Spinner';
import { fetchSingleImage, preloadImage } from '../../../hooks/useDogDetails/useDogDetails';
import { DogError } from '../DogError/DogError';

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
        <div className="flex flex-col gap-5 px-5 pb-[100px] max-w-[1200px] mx-auto items-center">
            <h1 className="text-center typography-header-large typography-bold typography-primary">
                {t('headers.randomImage')}
                {breedName && ` - ${capitalizeFirstLetter(breedName)}`}
                {variant && ` ${capitalizeFirstLetter(variant)}`}
            </h1>
            <div className="flex flex-col items-center gap-5 w-full">
                <div className="relative w-[500px] h-[500px] min-w-[500px] min-h-[500px] rounded-xl overflow-hidden bg-[color:var(--secondary)] shadow-[0_4px_12px_rgba(0,0,0,0.15)] md:max-md:w-full md:max-md:max-w-[400px] md:max-md:h-[400px] md:max-md:min-w-full md:max-md:min-h-[400px] max-sm:max-w-[300px] max-sm:h-[300px] max-sm:min-h-[300px]">
                    {currentImage ? (
                        <img
                            key={imageKey}
                            src={currentImage}
                            alt="random-dog-image"
                            className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
                        />
                    ) : (
                        <div className="w-full h-full bg-[color:var(--secondary)]" />
                    )}
                    {isLoading && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] pointer-events-none w-[60px] h-[60px] flex items-center justify-center bg-white/90 rounded-full">
                            <Spinner
                                className="w-[50px] h-[50px] animate-spin"
                                color="var(--secondary)"
                            />
                        </div>
                    )}
                </div>
                <button
                    onClick={handleRandomClick}
                    className="py-3 px-6 bg-[color:var(--secondary)] border-none rounded-lg cursor-pointer transition-all duration-300 ease-in-out shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:not-disabled:opacity-80 hover:not-disabled:shadow-[0_4px_12px_rgba(0,0,0,0.15)] disabled:opacity-60 disabled:cursor-not-allowed primary typography-secondary typography-bold"
                    disabled={isLoading}
                >
                    {t('buttons.getRandom')}
                </button>
            </div>
        </div>
    );
};

export default RandomDogImage;

