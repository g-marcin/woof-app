import { useEffect, useState } from 'react'
import { apiGet } from '../../common'
import type { DogVariants } from '../../types'
import { dogVariantsMapper } from './dogVariantsMapper'

export const useDogVariants = (breedName: string) => {
    const [dogVariants, setDogVariants] = useState<DogVariants>([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    useEffect(() => {
        setIsLoading(true)

        apiGet('/breed/{breed}/list', { breed: breedName })
            .then(data => {
                if (data.status === 'success') {
                    setIsError(false)
                    setDogVariants(dogVariantsMapper(data))
                } else {
                    throw new Error(
                        `Failed to fetch breed variants: ${data.status}`
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
