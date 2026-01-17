import { PropsWithChildren, FC, useState, Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'
import { useContext } from 'react'


type DogSearchContextType = [string, Dispatch<SetStateAction<string>>]

export const DogSearchContext = createContext<DogSearchContextType>((['', () => {}] as unknown) as DogSearchContextType)

export const DogSearchContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <DogSearchContext.Provider value={[searchQuery, setSearchQuery]}>
            {children}
        </DogSearchContext.Provider>
    )
}

export const useDogSearchContext = () => {
  const dogSearchContextValue = useContext(DogSearchContext)

  return dogSearchContextValue
}
