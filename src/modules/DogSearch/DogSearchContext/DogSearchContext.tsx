import React, { PropsWithChildren, FC, useState } from 'react'
import { createContext } from 'react'

export const DogSearchContext = createContext<any|undefined>(undefined)

export const DogSearchContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [searchQuery, setSearchQuery] = useState('')
    return (
        <DogSearchContext.Provider value={[searchQuery, setSearchQuery]}>
            {children}
        </DogSearchContext.Provider>
    )
}
