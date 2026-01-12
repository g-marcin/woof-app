import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ShieldDogSolid } from '@assets/svg/ShieldDogSolid';
import styles from './header.module.css';

export const Header: FC = () => {
    return (
        <header className={`flex justify-between items-center h-13 z-50 p-5 bg-secondary `}>
            <Link className="flex items-center gap-2" to="/">
                <ShieldDogSolid className={styles['logo-image']} />
                <span className={styles['logo-text']}>woof-app</span>
            </Link>
        </header>
    );
};
