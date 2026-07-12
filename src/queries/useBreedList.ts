import { useQuery } from '@tanstack/react-query'
import type { components } from '@mgrzmil-org/api-types'
import { httpClient } from '../common'
import { DogEntries } from '../types'
import { dogListMapper } from '../hooks/useDogList/dogListMapper'
import { queryKeys } from './queryKeys'

type DogListResponse =
    components['schemas']['APIResponse_Dict_str__List_str___']

const fetchBreedList = async (): Promise<DogEntries> => {
    const response = await httpClient.get<DogListResponse>('/breeds/list/all')

    if (response.data.status !== 'success') {
        throw new Error(`Failed to fetch breed list: ${response.data.status}`)
    }

    return dogListMapper(response.data)
}

export const useBreedList = () => {
    return useQuery({
        queryKey: queryKeys.breeds.list(),
        queryFn: fetchBreedList,
    })
}
