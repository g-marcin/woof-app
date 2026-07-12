import type { components } from '@mgrzmil-org/api-types'

type DogListResponse =
    components['schemas']['APIResponse_Dict_str__List_str___']

export const dogListMapper = (dogListResponse: DogListResponse) => {
    return Object.entries(dogListResponse.message)
}
