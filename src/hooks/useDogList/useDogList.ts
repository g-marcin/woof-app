import { useSuspenseQuery } from '@tanstack/react-query'
import { httpClient } from '../../common'
import { queryKeys } from '../../queries/queryKeys'
import type { DogListDTO } from '../../types'
import { dogListMapper } from './dogListMapper'

const fetchDogList = async () => {
    const response = await httpClient.get<DogListDTO>('/breeds/list/all')
    if (response.data.code) {
        throw new Error(`${response.data.code} ${response.data.status}`)
    }
    return dogListMapper(response.data)
}

export const useDogList = () => {
    const { data } = useSuspenseQuery({
        queryKey: queryKeys.breeds.list(),
        queryFn: fetchDogList,
    })
    return { dogEntries: data }
}
