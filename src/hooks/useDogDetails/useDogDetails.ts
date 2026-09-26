import { apiGetMessage } from '../../common'

export const MAX_QUEUE_SIZE = 5

export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => resolve()
        img.onerror = reject
        img.src = src
    })
}

export const fetchSingleImage = (
    breedName: string,
    breedVariant: string,
    signal?: AbortSignal
): Promise<string> => {
    if (!breedName) {
        return apiGetMessage('/breeds/image/random', { signal })
    }
    if (breedVariant) {
        return apiGetMessage('/breed/{breed}/{subbreed}/images/random', {
            path: { breed: breedName, subbreed: breedVariant },
            signal,
        })
    }
    return apiGetMessage('/breed/{breed}/images/random', {
        path: { breed: breedName },
        signal,
    })
}

export const fetchDogImageList = (
    breedName: string,
    breedVariant: string,
    signal?: AbortSignal
): Promise<string[]> => {
    if (breedVariant) {
        return apiGetMessage('/breed/{breed}/{subbreed}/images', {
            path: { breed: breedName, subbreed: breedVariant },
            signal,
        })
    }
    return apiGetMessage('/breed/{breed}/images', {
        path: { breed: breedName },
        signal,
    })
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
