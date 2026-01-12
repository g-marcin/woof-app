import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';
import { Searchbar } from './Searchbar';
import { DogSearchContextProvider } from '../../common/DogSearchContext/DogSearchContext';

const Search: FC = () => {
    const { breedName } = useParams();
    const { t } = useTranslation();

    return (
        <DogSearchContextProvider>
        <div className='flex flex-col items-center content-center margin-auto max-w-680px gap-2.5 p-3'>
            {!breedName && (
                <h1 className='flex content-center justify-center pb-1'>
                    {t('headers.keepSearching')}
                </h1>
            )}
            <Searchbar />
            <Outlet />
        </div>
        </DogSearchContextProvider>
    );
};

export default Search;
