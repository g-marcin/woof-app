import { FC } from 'react';
import { Link } from 'react-router-dom';
import dogIcon from '@assets/shield-dog-solid.svg';
import styles from './header.module.css';

export const Header: FC = () => {
    return (
        // <header className={`${styles.header}`}>
        /*
        .header {
    background: var(--secondary);
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    position: fixed;
    width: 100%;
    z-index: 5;
    padding: 0 15px;
}
        */
        <header className={`flex justify-between items-center h-13 z-50 p-5 bg-secondary `}>
            <Link className="flex items-center gap-2" to="/">
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
