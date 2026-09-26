import { useQuery } from '@tanstack/react-query'
import { apiGet } from '../common'
import { DogEntries } from '../types'
import { dogListMapper } from '../hooks/useDogList/dogListMapper'
import { queryKeys } from './queryKeys'

const fetchBreedList = async (): Promise<DogEntries> => {
    const data = await apiGet('/breeds/list/all')

    if (data.status !== 'success') {
        throw new Error(`Failed to fetch breed list: ${data.status}`)
    }

    return dogListMapper(data)
}

export const useBreedList = () => {
    return useQuery({
        queryKey: queryKeys.breeds.list(),
        queryFn: fetchBreedList,
    })
}
