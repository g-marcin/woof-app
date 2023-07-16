import { FC, useEffect, useState } from 'react';
import loaderIcon from '../../assets/spinner.svg';
import styles from './loader.module.css';

export const Loader: FC = () => {
    const [isTimeout, setIsTimeout] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsTimeout(true), 4000);
    }, []);

    return (
        <div className={styles['animation-container']}>
            {isTimeout ? (
                <div>No data available</div>
            ) : (
                <img
                    src={loaderIcon}
                    alt="loader-icon"
                    className={`${styles['rotate']} ${styles['icon']}`}
                />
            )}
        </div>
    );
};
