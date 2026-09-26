import { useSuspenseQuery } from '@tanstack/react-query'
import { listAllBreedsOptions } from '../../api/generated/@tanstack/react-query.gen'
import { dogListMapper } from './dogListMapper'

export const useDogList = () => {
    const { data } = useSuspenseQuery({
        ...listAllBreedsOptions(),
        select: response => dogListMapper(response.message),
    })
    return { dogEntries: data }
}
