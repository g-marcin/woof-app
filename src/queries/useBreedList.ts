import { useQuery } from '@tanstack/react-query'
import { httpClient } from '../common'
import { DogListDTO, DogEntries } from '../types'
import { dogListMapper } from '../hooks/useDogList/dogListMapper'
import { queryKeys } from './queryKeys'

const fetchBreedList = async (): Promise<DogEntries> => {
    const response = await httpClient.get<DogListDTO>('/breeds/list/all')

    if (response.data.code) {
        throw new Error(`${response.data.code} ${response.data.status}`)
    }

    return dogListMapper(response.data)
}

export const useBreedList = () => {
    return useQuery({
        queryKey: queryKeys.breeds.list(),
        queryFn: fetchBreedList,
    })
}
