import type { components } from '@mgrzmil-org/api-types'

type DogVariantsResponse = components['schemas']['APIResponse_List_str__']

export const dogVariantsMapper = (dogVariantsResponse: DogVariantsResponse) => {
    return dogVariantsResponse.message
}
