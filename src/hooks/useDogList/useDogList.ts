import { useSuspenseQuery } from '@tanstack/react-query'
import { apiGet } from '../../common'
import { queryKeys } from '../../queries/queryKeys'
import { dogListMapper } from './dogListMapper'

const fetchDogList = async () => {
    const data = await apiGet('/breeds/list/all')
    if (data.status !== 'success') {
        throw new Error(`Failed to fetch breed list: ${data.status}`)
    }
    return dogListMapper(data)
}

export const useDogList = () => {
    const { data } = useSuspenseQuery({
        queryKey: queryKeys.breeds.list(),
        queryFn: fetchDogList,
    })
    return { dogEntries: data }
}
