import { FC, useEffect, useState} from 'react';
import { useDogSearchContext } from '../../hooks/useDogSearchContext';
import { DogEntries } from '../../types';

type DogBreed = string;


type AutocompleteProps = {
    dogList: DogEntries
    onSearch: (breedName: DogBreed) => void
}

export const Autocomplete:FC<AutocompleteProps> = ({dogList, onSearch}) => {
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
        onSearch(breedName)
    }
    return <div className='absolute z-20 w-[280px] h-[100px] overflow-y-scroll overflow-x-hidden bg-black/40 md:w-[180px]'>
        <ul className='p-0 m-0'>
        {dogList
        .filter((result)=>result[0].startsWith(debouncedQuery))
        .map((result, index) => {
            return (<li className='list-none m-1 p-1 hover:bg-secondary hover:text-typography-secondary cursor-pointer' key={index} onClick={()=>onClick(result[0])}>{result[0]}</li>)
        })}
        </ul>
    </div>;
}


