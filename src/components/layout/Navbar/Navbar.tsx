import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './subheader.module.css';

export const Navbar: FC = () => {

  return (
    <nav className={`${styles.nav} text-decoration-none`}>
      <NavLink to="/home" className={`${styles.homeCrumb} text-decoration-none`}>
        Home
      </NavLink>
      <NavLink to="/search" className={`${styles.homeCrumb} text-decoration-none`}>
        Search
      </NavLink>
    </nav>
  );
};
