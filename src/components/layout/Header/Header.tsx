import { FC } from 'react';
import { Menu } from 'react-feather';
import { Link } from 'react-router-dom';
import dogIcon from '../../../assets/shield-dog-solid.svg';
import styles from './header.module.css';

export const Header: FC = () => {

  return (
      <header className={styles.header}>
        <Link className={styles.logo} to="/">
          <img src={dogIcon} alt="logo" className={styles.logoImage} />
          <span className="text-decoration-none">woof-app</span>
        </Link>
        <button className={styles.menuButton} >
          <Menu className={styles.menu} color="#ffffff" />
        </button>
      </header>
  );
};
