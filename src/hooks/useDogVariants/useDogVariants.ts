import type { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import type { components } from '@mgrzmil-org/api-types'
import { httpClient } from '../../common'
import type { DogVariants } from '../../types'
import { dogVariantsMapper } from './dogVariantsMapper'

type DogVariantsResponse = components['schemas']['APIResponse_List_str__']

export const useDogVariants = (breedName: string) => {
    const [dogVariants, setDogVariants] = useState<DogVariants>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setIsLoading(true)

        httpClient
            .get(`/breed/${breedName}/list`)
            .then((response: AxiosResponse<DogVariantsResponse>) => {
                if (response.data.status === 'success') {
                    setIsError(false)
                    setDogVariants(dogVariantsMapper(response.data))
                } else {
                    throw new Error(
                        `Failed to fetch breed variants: ${response.data.status}`
                    )
                }
            })
            .then(() => setIsLoading(false))
            .catch((error: Error) => {
                console.error(error)
                setIsError(true)
            })
    }, [breedName])
    return { dogVariants: dogVariants, isLoading: isLoading, isError: isError }
}
