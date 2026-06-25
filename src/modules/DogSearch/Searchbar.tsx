import { FC, useCallback, useRef, useState } from 'react'
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

    const onSearch = (breed: DogBreed) => {
        const normalized = breed.toLocaleLowerCase().trim()
        if (normalized) {
            const known = dogEntries.some(([name]) => name.toLowerCase() === normalized)
            if (!known) {
                setInputError(true)
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
                    <p className="absolute text-red-500 text-[10px] mt-0.5 left-0 whitespace-nowrap">
                        {t('errors.noBreed1')}{t('errors.noBreed2')}
                    </p>
                )}
                {isFocused ? (
                    <Autocomplete dogList={dogEntries} onSearch={onSearch} onKeyboardRef={onKeyboardRef} listboxId={listboxId} onActiveIndexChange={setActiveIndex} />
                ) : (
                    <></>
                )}
            </div>
            <button
                type="button"
                className="primary typography-secondary"
                onClick={() => onSearch(searchQuery as DogBreed)}
            >
                {t('buttons.search')}
            </button>
        </form>
    )
}
