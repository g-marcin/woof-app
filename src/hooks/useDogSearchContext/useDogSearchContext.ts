import { useContext } from 'react'
import { DogSearchContext } from '../../common/DogSearchContext/DogSearchContext'

export const useDogSearchContext = () => {
  const dogSearchContextValue = useContext(DogSearchContext)

  return dogSearchContextValue
}
