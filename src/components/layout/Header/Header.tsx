import { FC } from 'react';
import { Link } from 'react-router-dom';
import dogIcon from '../../../assets/shield-dog-solid.svg';
import styles from './header.module.css';

export const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Link className={styles.logo} to="/">
                <img
                    src={dogIcon}
                    alt="logo"
                    className={styles['logo-image']}
                />
                <span className={styles['logo-text']}>woof-app</span>
            </Link>
        </header>
    );
};
