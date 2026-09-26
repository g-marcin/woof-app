import type { components } from '@mgrzmil-org/api-types'

type DogListMessage =
    components['schemas']['APIResponse_Dict_str__List_str___']['message']

export const dogListMapper = (dogListMessage: DogListMessage) => {
    return Object.entries(dogListMessage)
}
