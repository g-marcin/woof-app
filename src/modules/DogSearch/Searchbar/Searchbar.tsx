import { FC,useEffect} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './searchbar.module.css';
import { Autocomplete } from '../../../components/Autocomplete';
import { useDogList } from '../../../hooks';
import { Loader } from '../../../components';
import { useDogSearchContext } from '../../../hooks/useDogSearchContext';

export type DogBreed = string;

export const Searchbar: FC = () => {
    const { t } = useTranslation();
    const { breedName } = useParams();
    const [searchQuery, setSearchQuery] = useDogSearchContext()
    const navigate = useNavigate();
    const onSearch = (breedName:DogBreed) => {
        if (searchQuery) {
            navigate(`/search/${breedName}`.toLocaleLowerCase().trim());
        }
    };
    const {dogEntries, isLoading} = useDogList();
    useEffect(() => {
        
    }, [searchQuery])
    return (
        <form className={styles['searchbar']}>
            <div className={styles['input-wrapper']}>
                <input
                    type="text"
                    className={styles['search-input']}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                    }}
                    autoFocus
                    required
                    placeholder={breedName}
                    onFocus={(e) => {
                        e.target.placeholder = '';
                    }}
                    onBlur={(e) => {
                        if (!breedName) {
                            return;
                        }
                        e.target.setAttribute('placeholder', breedName);
                    }}
                    value={searchQuery}
                />
                <div className={styles['input-label']}>
                    {t('labels.typeDog')}
                </div>
            {isLoading ? <Loader/> : <Autocomplete results={dogEntries} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSearch={onSearch}/>}
            </div>
            <button type="submit" className="primary" onClick={()=>onSearch(searchQuery as DogBreed)}>
                {t('buttons.search')}
            </button>
        </form>
    );
};
