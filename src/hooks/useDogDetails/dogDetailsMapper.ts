import { DogDetailsDTO } from '../../types'

export const dogDetailsMapper = (dogDetailsDTO: DogDetailsDTO) => {
    return {
        imageSrc: dogDetailsDTO.message,
        status: dogDetailsDTO.status,
        code: dogDetailsDTO.code,
    }
}
