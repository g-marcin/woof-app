import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Navbar } from './Navbar';
import styles from './layout.module.css';

export const Layout: FC = () => {
    return (
        <div id="theme" className="light">
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Navbar />
        </div>
    );
};
