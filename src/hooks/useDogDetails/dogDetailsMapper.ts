import type { components } from '@mgrzmil-org/api-types'

type DogDetailsResponse = components['schemas']['APIResponse_str_']

export const dogDetailsMapper = (dogDetailsResponse: DogDetailsResponse) => {
    return {
        imageSrc: dogDetailsResponse.message,
        status: dogDetailsResponse.status,
    }
}
