import React, { FC, useMemo } from 'react';
import styles from './autocomplete.module.css';
import { useDogSearchContext } from '../../hooks/useDogSearchContext';
import { DogBreed } from '../../modules/DogSearch';

export const Autocomplete:FC<any> = ({results, onSearch}) => {
    const [searchQuery, setSearchQuery] = useDogSearchContext();

    const onClick = (breedName: DogBreed) => {
        setSearchQuery(breedName);
        onSearch(breedName)
    }
    return <div className={styles.modal}>
        {searchQuery}
        <ul>
        {results.filter((result)=>result[0].includes(searchQuery))
.map((result, index) => {
        console.log(result);
        
        return (<li key={index} onClick={()=>onClick(result[0])}>{result}</li>)
        })}
        </ul>
    </div>;
}


