import { FC, useEffect, useState } from 'react';
import { useDogSearchContext } from '../../context/DogSearchContext/DogSearchContext';
import { DogEntries } from '../../types';

type DogBreed = string;

type AutocompleteProps = {
    dogList: DogEntries;
    onSearch: (breedName: DogBreed) => void;
};

export const Autocomplete: FC<AutocompleteProps> = ({ dogList, onSearch }) => {
    const [searchQuery, setSearchQuery] = useDogSearchContext();
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300);

        return () => {
            clearTimeout(timerId);
        };
    }, [searchQuery]);

    const onClick = (breedName: DogBreed) => {
        setSearchQuery(breedName);
        onSearch(breedName);
    };

    const filteredResults = dogList.filter(
        (result) =>
            result[0].toLowerCase().startsWith(debouncedQuery.toLowerCase()),
    );

    return (
        <div className="absolute top-full left-0 z-20 w-full max-h-64 overflow-y-auto overflow-x-hidden mt-1 bg-[color:var(--primary)] border-2 border-[color:var(--secondary)] rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200">
            <ul className="p-0 m-0 list-none">
                {filteredResults.length > 0 ? (
                    filteredResults.map((result) => (
                        <li
                            key={result[0]}
                            onClick={() => onClick(result[0])}
                            className="px-3 py-2 hover:bg-[color:var(--secondary)] text-[color:var(--typography-primary)] hover:text-[color:var(--typography-secondary)] cursor-pointer transition-colors duration-150 border-b border-[color:var(--secondary)]/30 last:border-b-0"
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
    );
};


