import type { components } from '@mgrzmil-org/api-types'
import { httpClient } from '../../common'
import { dogDetailsMapper } from './dogDetailsMapper'

export const MAX_QUEUE_SIZE = 5

type DogDetailsResponse = components['schemas']['APIResponse_str_']
type DogImageListResponse = components['schemas']['APIResponse_List_str__']

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
    const endpoint = breedName
        ? `/breed/${breedName}${breedVariant ? `/${breedVariant}` : ''}/images/random`
        : '/breeds/image/random'
    const response = await httpClient.get<DogDetailsResponse>(endpoint)
    if (response.data.status === 'success') {
        return dogDetailsMapper(response.data).imageSrc
    }
    throw new Error(`Failed to fetch image: ${response.data.status}`)
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
    const response = await httpClient.get<DogImageListResponse>(
        `/breed/${breedName}${breedVariant ? `/${breedVariant}` : ''}/images`
    )
    if (
        response.data.status === 'success' &&
        Array.isArray(response.data.message)
    ) {
        return response.data.message
    }
    throw new Error('Failed to fetch image list')
}
