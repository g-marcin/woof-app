import { useSuspenseQuery } from '@tanstack/react-query'
import type { components } from '@mgrzmil-org/api-types'
import { httpClient } from '../../common'
import { queryKeys } from '../../queries/queryKeys'
import { dogListMapper } from './dogListMapper'

type DogListResponse =
    components['schemas']['APIResponse_Dict_str__List_str___']

const fetchDogList = async () => {
    const response = await httpClient.get<DogListResponse>('/breeds/list/all')
    if (response.data.status !== 'success') {
        throw new Error(`Failed to fetch breed list: ${response.data.status}`)
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
