import { FC } from "react";
import { NavLink } from "react-router-dom";
import dogIcon from "../../../assets/dog-solid.svg";
import searchIcon from "../../../assets/search.svg";

import styles from "./navbar.module.css";

export const Navbar: FC = () => {
  const navLinkState = ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => (isPending ? styles.link : isActive ? styles.active : "");

  return (
    <>
      <nav className={`${styles.nav} text-decoration-none`}>
        <NavLink to="/home" className={navLinkState}>
          <img src={dogIcon} alt="search" className={styles.icon} />
        </NavLink>
        <NavLink to="/search" className={navLinkState}>
          <img src={searchIcon} alt="search" className={styles.icon} />
        </NavLink>
      </nav>
    </>
  );
};
