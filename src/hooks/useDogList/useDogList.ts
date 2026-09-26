import { useSuspenseQuery } from '@tanstack/react-query'
import { apiGetMessage } from '../../common'
import { queryKeys } from '../../queries/queryKeys'
import { dogListMapper } from './dogListMapper'

const fetchDogList = async (signal?: AbortSignal) =>
    dogListMapper(await apiGetMessage('/breeds/list/all', { signal }))

export const useDogList = () => {
    const { data } = useSuspenseQuery({
        queryKey: queryKeys.breeds.list(),
        queryFn: ({ signal }) => fetchDogList(signal),
    })
    return { dogEntries: data }
}
