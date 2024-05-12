import { PropsWithChildren, FC, useState, Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

type DogSearchContextType = [string, Dispatch<SetStateAction<string>>]

export const DogSearchContext = createContext<DogSearchContextType|undefined>(undefined)

export const DogSearchContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('')
    return (
        <DogSearchContext.Provider value={[searchQuery, setSearchQuery]}>
            {children}
        </DogSearchContext.Provider>
    )
}
