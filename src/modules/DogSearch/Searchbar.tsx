import { FC, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Autocomplete } from '../../components/Autocomplete';
import { useDogList } from '../../hooks';
import { useDogSearchContext } from '../../context/DogSearchContext/DogSearchContext';


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
        <form className='flex gap-3 items-center border-2 border-secondary justify-center p-2.5 box-shadow-primary'>
            <div className='relative pt-2'>
                <label className="absolute -top-1 left-3 px-1 text-[10px] typography-secondary bg-[color:var(--secondary)] z-[2]">
                    {t('labels.typeDog')}
                </label>
                <input
                    type="text"
                    className="z-[1] w-[180px] md:w-[280px] relative"
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
                {isFocused ? <Autocomplete dogList={dogEntries} onSearch={onSearch}/>: <></> }
            </div>
            <button type="submit" className="primary typography-secondary" onClick={()=>onSearch(searchQuery as DogBreed)}>
                {t('buttons.search')}
            </button>
        </form>
    );
};
