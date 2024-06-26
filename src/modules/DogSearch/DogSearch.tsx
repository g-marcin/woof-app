import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useParams } from 'react-router-dom';
import { Searchbar } from '.';
import styles from './dogSearch.module.css';
import { DogSearchContextProvider } from './DogSearchContext/DogSearchContext';

const DogSearch: FC = () => {
    const { breedName } = useParams();
    const { t } = useTranslation();

    return (
        <DogSearchContextProvider>
        <div className={styles['main-wrapper']}>
            {!breedName && (
                <h1 className={styles['search-header']}>
                    {t('headers.keepSearching')}
                </h1>
            )}
            <Searchbar />
            <Outlet />
        </div>
        </DogSearchContextProvider>
    );
};

export default DogSearch;
