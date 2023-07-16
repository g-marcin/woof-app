import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import dogIcon from '../../../assets/dog-solid.svg';
import infoIcon from '../../../assets/info.svg';
import searchIcon from '../../../assets/search.svg';
import { NavLinkState } from '../../../types';
import { LanguageToggle } from '../../LanguageToggle';
import { ThemeToggle } from '../../ThemeToggle';
import styles from './navbar.module.css';

export const Navbar: FC = () => {
    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive ? styles.active : '';

    return (
        <nav className={styles['navbar']}>
            <span className={styles['navbar-group']}>
                <NavLink to="/home" className={navLinkState}>
                    <img src={dogIcon} alt="dog-icon" className={styles.icon} />
                </NavLink>
                <NavLink to="/search" className={navLinkState}>
                    <img
                        src={searchIcon}
                        alt="search-icon"
                        className={styles.icon}
                    />
                </NavLink>
            </span>
            <span className={styles['navbar-group']}>
                <ThemeToggle />
                <NavLink to="/readme" className={navLinkState}>
                    <img
                        src={infoIcon}
                        alt="info-icon"
                        className={styles.icon}
                    />
                </NavLink>
                <LanguageToggle />
            </span>
        </nav>
    );
};
