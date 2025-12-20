import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { DogVariantsTags, Loader } from '../../components';
import { NavLinkState } from '../../types';
import { useDogList } from '../../hooks/useDogList';
import tagStyles from '../../components/DogVariantTags/dogVariantTags.module.css';
import styles from './dogList.module.css';

const DogList: FC = () => {
    const { dogEntries, isLoading } = useDogList();
    console.log(dogEntries);
    
    const { t } = useTranslation();
    const navigate = useNavigate();

    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive 
            ? `${tagStyles['tag-active']}  typography-active typography-xs` 
            : `${tagStyles['tag']}  typography-secondary typography-xs`;

    return (
        <>
            {isLoading ? (
                <div className={styles['loader-wrapper']}>
                    <Loader />
                </div>
            ) : (
                <div className={styles['list-wrapper']}>
              
                    <h1 className={styles['list-header']}>
                        {t('headers.dogList')}
                    </h1>
                    {dogEntries.map(([dog, variants]) => {
                        return (
                                <Link
                                    to={`/search/${dog}`}
                                    className={styles['link']}
                                >
                            <div className={styles['list-item']} key={dog}>
                                    {dog}
                                
                                <div className={styles['tags-wrapper']}>
                                    {variants.map((variant) => {
                                        return (
                                            <button
                                                key={variant}
                                                onClick={() => {
                                                    navigate(
                                                        `/search/${dog}/${variant}`,
                                                    );
                                                }}
                                                className={`${styles.tag}`}
                                            >
                                                {variant}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                            </Link>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default DogList;
