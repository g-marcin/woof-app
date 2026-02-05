import { DogVariantsDTO } from '../../types'

export const dogVariantsMapper = (dogVariantsDTO: DogVariantsDTO) => {
    return dogVariantsDTO.message
}
