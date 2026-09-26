import {
    breedImages,
    randomBreedImage,
    randomImage,
    randomSubbreedImage,
    subbreedImages,
} from '../../api/generated'

export const MAX_QUEUE_SIZE = 5

export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = reject
        img.src = src
    })
}

export const fetchSingleImage = async (
    breedName: string,
    breedVariant: string,
    signal?: AbortSignal
): Promise<string> => {
    if (!breedName) {
        const { data } = await randomImage({ signal, throwOnError: true })
        return data.message
    }
    if (breedVariant) {
        const { data } = await randomSubbreedImage({
            path: { breed: breedName, subbreed: breedVariant },
            signal,
            throwOnError: true,
        })
        return data.message
    }
    const { data } = await randomBreedImage({
        path: { breed: breedName },
        signal,
        throwOnError: true,
    })
    return data.message
}

export const fetchDogImageList = async (
    breedName: string,
    breedVariant: string,
    signal?: AbortSignal
): Promise<string[]> => {
    if (breedVariant) {
        const { data } = await subbreedImages({
            path: { breed: breedName, subbreed: breedVariant },
            signal,
            throwOnError: true,
        })
        return data.message
    }
    const { data } = await breedImages({
        path: { breed: breedName },
        signal,
        throwOnError: true,
    })
    return data.message
}

export const fetchInitialImages = async (
    breedName: string,
    breedVariant: string
): Promise<string[]> => {
    const promises = Array.from({ length: MAX_QUEUE_SIZE }, () =>
        fetchSingleImage(breedName, breedVariant)
    )
    const images = await Promise.all(promises)
    await Promise.all(images.map(img => preloadImage(img)))
    return images
}
