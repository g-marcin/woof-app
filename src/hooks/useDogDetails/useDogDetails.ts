import { apiGet } from '../../common'
import { dogDetailsMapper } from './dogDetailsMapper'

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
    breedVariant: string
): Promise<string> => {
    const data = !breedName
        ? await apiGet('/breeds/image/random')
        : breedVariant
          ? await apiGet('/breed/{breed}/{subbreed}/images/random', {
                breed: breedName,
                subbreed: breedVariant,
            })
          : await apiGet('/breed/{breed}/images/random', { breed: breedName })
    if (data.status === 'success') {
        return dogDetailsMapper(data).imageSrc
    }
    throw new Error(`Failed to fetch image: ${data.status}`)
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

export const fetchDogImageList = async (
    breedName: string,
    breedVariant: string
): Promise<string[]> => {
    const data = breedVariant
        ? await apiGet('/breed/{breed}/{subbreed}/images', {
              breed: breedName,
              subbreed: breedVariant,
          })
        : await apiGet('/breed/{breed}/images', { breed: breedName })
    if (data.status === 'success' && Array.isArray(data.message)) {
        return data.message
    }
    throw new Error('Failed to fetch image list')
}
