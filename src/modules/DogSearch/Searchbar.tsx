import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { Autocomplete } from '../../components/Autocomplete'
import { useDogList } from '../../hooks'
import { useDogSearchContext } from '../../context/DogSearchContext/DogSearchContext'

export type DogBreed = string

export const Searchbar: FC = () => {
    const { t } = useTranslation()
    const { breedName } = useParams()
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useDogSearchContext()
    const { dogEntries } = useDogList()
    const [isFocused, setIsFocused] = useState(false)
    const [inputError, setInputError] = useState(false)
    const [activeIndex, setActiveIndex] = useState(-1)
    const keyboardHandlerRef = useRef<((e: KeyboardEvent) => void) | null>(null)
    const onKeyboardRef = useCallback((handler: (e: KeyboardEvent) => void) => {
        keyboardHandlerRef.current = handler
    }, [])
    const listboxId = 'dog-autocomplete-listbox'
    const activeOptionId = activeIndex >= 0 ? `dog-option-${activeIndex}` : undefined

    const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const showError = () => {
        setInputError(true)
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current)
        errorTimerRef.current = setTimeout(() => setInputError(false), 3000)
    }

    useEffect(() => () => { if (errorTimerRef.current) clearTimeout(errorTimerRef.current) }, [])

    const onSearch = (breed: DogBreed) => {
        const normalized = breed.toLocaleLowerCase().trim()
        if (normalized) {
            const known = dogEntries.some(([name]) => name.toLowerCase() === normalized)
            if (!known) {
                showError()
                return
            }
            setInputError(false)
            navigate(`/search/${normalized}`)
        }
        setIsFocused(false)
    }
    return (
        <form
            className="flex gap-3 items-center border-2 border-secondary justify-center p-2.5 box-shadow-primary"
            onSubmit={e => { e.preventDefault(); onSearch(searchQuery as DogBreed) }}
        >
            <div className="relative pt-2">
                <label className="absolute -top-1 left-3 px-1 text-[10px] typography-secondary bg-[color:var(--secondary)] z-[2]">
                    {t('labels.typeDog')}
                </label>
                <input
                    type="text"
                    role="combobox"
                    aria-autocomplete="list"
                    aria-expanded={isFocused}
                    aria-controls={listboxId}
                    aria-activedescendant={activeOptionId}
                    className="z-[1] w-[180px] md:w-[280px] relative"
                    onChange={e => {
                        setSearchQuery(e.target.value)
                        setInputError(false)
                    }}
                    onKeyDown={e => keyboardHandlerRef.current?.(e.nativeEvent)}
                    required
                    placeholder={breedName}
                    onFocus={e => {
                        e.target.placeholder = ''
                        setSearchQuery('')
                        setIsFocused(true)
                    }}
                    onClick={() => setSearchQuery('')}
                    onBlur={e => {
                        if (!breedName) {
                            return
                        }
                        e.target.setAttribute('placeholder', breedName)
                        setTimeout(() => {
                            setIsFocused(false)
                        }, 100)
                    }}
                    value={searchQuery}
                />
                {inputError && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 bg-red-600 text-white text-xs rounded px-2 py-1 whitespace-nowrap shadow-md">
                        {t('errors.noBreed')}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-red-600" />
                    </div>
                )}
                {isFocused ? (
                    <Autocomplete dogList={dogEntries} onSearch={onSearch} onKeyboardRef={onKeyboardRef} listboxId={listboxId} onActiveIndexChange={setActiveIndex} />
                ) : (
                    <></>
                )}
            </div>
            <button
                type="button"
                className="primary typography-secondary mt-2"
                onClick={() => onSearch(searchQuery as DogBreed)}
            >
                {t('buttons.search')}
            </button>
        </form>
    )
}
