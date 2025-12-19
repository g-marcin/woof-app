import { FC, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './searchbar.module.css';
import { Autocomplete } from '../../../components/Autocomplete';
import { useDogList } from '../../../hooks';
import { useDogSearchContext } from '../../../hooks/useDogSearchContext';

export type DogBreed = string;

export const Searchbar: FC = () => {
    const { t } = useTranslation();
    const { breedName } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useDogSearchContext()
    const {dogEntries} = useDogList();
    const [isFocused, setIsFocused] = useState(false);

    const onSearch = (breedName:DogBreed) => {
        if (searchQuery) {
            navigate(`/search/${breedName}`.toLocaleLowerCase().trim());
        }
        setIsFocused(false);
    };
    return (
        <form className={styles['searchbar']}>
            <div className={styles['input-wrapper']}>
                <div className={styles['input-container']}>
                <input
                    type="text"
                    className={styles['search-input']}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    
                    required
                    placeholder={breedName}
                    onFocus={(e) => {
                        e.target.placeholder = '';
                        setIsFocused(true);
                    }}
                    onBlur={(e) => {
                        if (!breedName) {
                            return;
                        }
                        e.target.setAttribute('placeholder', breedName);
                        setTimeout(() => {
                             setIsFocused(false);
                        }, 100);
                    }}
                    value={searchQuery}
                />
                <div className={styles['input-label']}>
                    {t('labels.typeDog')}
                </div>
                    {isFocused ? <Autocomplete dogList={dogEntries} onSearch={onSearch}/>: <></> }
                </div>
               
            </div>
            <button type="submit" className="primary primary-search" onClick={()=>onSearch(searchQuery as DogBreed)}>
                {t('buttons.search')}
            </button>
        </form>
    );
};
