import { FC, useEffect, useState} from 'react';
import styles from './autocomplete.module.css';
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
    return <div className={styles.modal}>
        <ul>
        {dogList
        .filter((result)=>result[0].startsWith(debouncedQuery))
        .map((result, index) => {
            return (<li className={styles['autocomplete-item']} key={index} onClick={()=>onClick(result[0])}>{result[0]}</li>)
        })}
        </ul>
    </div>;
}


