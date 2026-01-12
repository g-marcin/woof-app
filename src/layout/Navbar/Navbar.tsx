import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { DogSolid } from '@assets/svg/DogSolid';
import { Info } from '@assets/svg/Info';
import { Search } from '@assets/svg/Search';
import { NavLinkState } from '../../types';
import { LanguageToggle } from '../../components/LanguageToggle';
import { ThemeToggle } from '../../components/ThemeToggle';
import styles from './navbar.module.css';

export const Navbar: FC = () => {
    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive ? styles.active : '';

    return (
        <nav className={styles['navbar']}>
            <span className={styles['navbar-group']}>
                <NavLink to="/listing" className={navLinkState}>
                    <DogSolid className={styles.icon} />
                </NavLink>
                <NavLink to="/search" className={navLinkState}>
                    <Search className={styles.icon} />
                </NavLink>
            </span>
            <span className={styles['navbar-group']}>
                <ThemeToggle />
                <NavLink to="/readme" className={navLinkState}>
                    <Info className={styles.icon} />
                </NavLink>
                <LanguageToggle />
            </span>
        </nav>
    );
};
