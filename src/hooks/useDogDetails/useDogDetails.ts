import { httpClient } from '../../common';
import { DogDetailsDTO } from '../../types';
import { dogDetailsMapper } from './dogDetailsMapper';

export const MAX_QUEUE_SIZE = 5;

export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
};

export const fetchSingleImage = async (
    breedName: string,
    breedVariant: string,
): Promise<string> => {
    const response = await httpClient.get<DogDetailsDTO>(
        `/breed/${breedName}${breedVariant ? `/${breedVariant}` : ''}/images/random`,
    );
    if (!response.data.code) {
        return dogDetailsMapper(response.data).imageSrc;
    }
    throw new Error(`${response.data.code} ${response.data.status}`);
};

export const fetchInitialImages = async (
    breedName: string,
    breedVariant: string,
): Promise<string[]> => {
    const promises = Array.from({ length: MAX_QUEUE_SIZE }, () =>
        fetchSingleImage(breedName, breedVariant),
    );
    const images = await Promise.all(promises);
    await Promise.all(images.map(img => preloadImage(img)));
    return images;
};
