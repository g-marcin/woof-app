import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { DogSolid } from '@assets/svg/DogSolid';
import { Info } from '@assets/svg/Info';
import { Search } from '@assets/svg/Search';
import { NavLinkState } from '../../types';
import { LanguageToggle } from '../../components/LanguageToggle';
import { ThemeToggle } from '../../components/ThemeToggle';

export const Navbar: FC = () => {
    const navLinkState = ({ isActive }: NavLinkState) =>
        isActive ? 'filter-active' : '';

    return (
        <nav className='fixed bottom-0 w-full flex items-center justify-between h-[60px] bg-secondary z-10'>
            <span className='flex gap-[25px] px-[25px] py-[15px] items-center'>
                <NavLink to="/listing" className={navLinkState}>
                    <DogSolid className='hover:opacity-80 transition-opacity' />
                </NavLink>
                <NavLink to="/search" className={navLinkState}>
                    <Search className='hover:opacity-80 transition-opacity' />
                </NavLink>
            </span>
            <span className='flex gap-[25px] px-[25px] py-[15px] items-center'>
                <ThemeToggle />
                <NavLink to="/readme" className={navLinkState}>
                    <Info className='hover:opacity-80 transition-opacity' />
                </NavLink>
                <LanguageToggle />
            </span>
        </nav>
    );
};
