import type { ApiResponseDictStrListStr } from '../../api/generated'

export const dogListMapper = (
    dogListMessage: ApiResponseDictStrListStr['message']
) => {
    return Object.entries(dogListMessage)
}
