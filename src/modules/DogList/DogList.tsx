import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Loader } from '../../components';
import { useDogList } from '../../hooks/useDogList';
import styles from './dogList.module.css';
const DogList: FC = () => {
    const { dogEntries, isLoading } = useDogList();
    const { t } = useTranslation();
    const navigate = useNavigate();

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
                            <div className={styles['list-item']} key={dog}>
                                <Link
                                    to={`/search/${dog}`}
                                    className={styles['link']}
                                >
                                    {dog}
                                </Link>
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
                                                className={styles.tag}
                                            >
                                                {variant}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default DogList;
