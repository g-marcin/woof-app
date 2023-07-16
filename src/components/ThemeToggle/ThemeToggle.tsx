import { FC, useEffect, useState } from 'react';
import bulbRegular from '../../assets/bulb-regular.svg';
import bulbSolid from '../../assets/bulb-solid.svg';

export const ThemeToggle: FC = () => {
    const [isDark, setIsDark] = useState(
        window.localStorage.getItem('theme') === 'dark',
    );
    useEffect(() => {
        const htmlElement = document.getElementsByTagName('html')[0];
        const currentTheme = window.localStorage.getItem('theme');
        htmlElement.setAttribute(
            'data-theme',
            currentTheme ? currentTheme : 'dark',
        );
        !currentTheme && window.localStorage.setItem('theme', 'dark');
        !currentTheme && setIsDark(true);
    }, []);
    const onBulbClick = () => {
        const currentTheme = isDark;
        const newTheme = !currentTheme;
        window.localStorage.setItem('theme', newTheme ? 'dark' : 'light');
        setIsDark(newTheme);
        document
            .getElementsByTagName('html')[0]
            ?.setAttribute('data-theme', `${newTheme ? 'dark' : 'light'}`);
    };
    return (
        <button onClick={onBulbClick}>
            {isDark ? (
                <img src={bulbSolid} alt="bulb-off" />
            ) : (
                <img src={bulbRegular} alt="bulb-on" />
            )}
        </button>
    );
};
