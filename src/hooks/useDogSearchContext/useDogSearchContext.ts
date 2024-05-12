import { useContext } from 'react'
import { DogSearchContext } from '../../modules/DogSearch/DogSearchContext/DogSearchContext'

export const useDogSearchContext = () => {
  const dogSearchContextValue = useContext(DogSearchContext)

  return dogSearchContextValue
}
