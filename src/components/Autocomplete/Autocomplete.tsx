import { FC, useEffect, useRef, useState } from 'react'
import { useDogSearchContext } from '../../context/DogSearchContext/DogSearchContext'
import { DogEntries } from '../../types'

type DogBreed = string

type AutocompleteProps = {
    dogList: DogEntries
    onSearch: (breedName: DogBreed) => void
    onKeyboardRef: (handler: (e: KeyboardEvent) => void) => void
}

export const Autocomplete: FC<AutocompleteProps> = ({ dogList, onSearch, onKeyboardRef }) => {
    const [searchQuery, setSearchQuery] = useDogSearchContext()
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
    const [activeIndex, setActiveIndex] = useState(-1)

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(searchQuery)
            setActiveIndex(-1)
        }, 300)
        return () => clearTimeout(timerId)
    }, [searchQuery])

    const filteredResults = dogList.filter(result =>
        result[0].toLowerCase().startsWith(debouncedQuery.toLowerCase())
    )

    const activeIndexRef = useRef(activeIndex)
    activeIndexRef.current = activeIndex

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                e.preventDefault()
                setActiveIndex(i => Math.min(i + 1, filteredResults.length - 1))
            } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setActiveIndex(i => Math.max(i - 1, -1))
            } else if (e.key === 'Enter') {
                const idx = activeIndexRef.current
                if (idx >= 0 && filteredResults[idx]) {
                    e.preventDefault()
                    const breed = filteredResults[idx][0]
                    setSearchQuery(breed)
                    onSearch(breed)
                }
            }
        }
        onKeyboardRef(handler)
    }, [filteredResults, onSearch, setSearchQuery, onKeyboardRef])

    const onClick = (breedName: DogBreed) => {
        setSearchQuery(breedName)
        onSearch(breedName)
    }

    return (
        <div className="absolute top-full left-0 z-20 w-full max-h-64 overflow-y-auto overflow-x-hidden mt-1 bg-[color:var(--primary)] border-2 border-[color:var(--secondary)] rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200">
            <ul className="p-0 m-0 list-none">
                {filteredResults.length > 0 ? (
                    filteredResults.map((result, i) => (
                        <li
                            key={result[0]}
                            onMouseDown={e => {
                                e.preventDefault()
                                onClick(result[0])
                            }}
                            className={`px-3 py-2 text-[color:var(--typography-primary)] cursor-pointer transition-colors duration-150 border-b border-[color:var(--secondary)]/30 last:border-b-0 ${i === activeIndex ? 'bg-[color:var(--secondary)] text-[color:var(--typography-secondary)]' : 'hover:bg-[color:var(--secondary)] hover:text-[color:var(--typography-secondary)]'}`}
                        >
                            {result[0]}
                        </li>
                    ))
                ) : (
                    <li className="px-3 py-4 text-center text-[color:var(--typography-primary)]/60 text-sm">
                        No breeds found
                    </li>
                )}
            </ul>
        </div>
    )
}
