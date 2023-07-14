import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import dogIcon from "../../../assets/dog-solid.svg";
import enFlag from "../../../assets/en.svg";
import plFlag from "../../../assets/pl.svg";
import searchIcon from "../../../assets/search.svg";
import { NavLinkState } from "../../../types";
import styles from "./navbar.module.css";

export const Navbar: FC = () => {
  const { i18n } = useTranslation();
  const navLinkState = ({ isActive }: NavLinkState) => (isActive ? styles.active : "");
  const getUserLanguage = () => {
    return window.localStorage.getItem("lang");
  };
  const [language, setLanguage] = useState(getUserLanguage() === "en");
  const onFlagClick = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const _ = i18n.changeLanguage(`${language ? "pl" : "en"}`);
    setLanguage(() => !language);
    window.localStorage.setItem("lang", language ? "pl" : "en");
  };

  return (
    <nav className={styles["navbar"]}>
      <span className={styles["navbar-group"]}>
        <NavLink to="/home" className={navLinkState}>
          <img src={dogIcon} alt="dog-icon" className={styles.icon} />
        </NavLink>
        <NavLink to="/search" className={navLinkState}>
          <img src={searchIcon} alt="search-icon" className={styles.icon} />
        </NavLink>
      </span>
      <span className={styles["navbar-group"]}>
        <button onClick={onFlagClick} className={styles["button-language"]}>
          {language ? (
            <img src={plFlag} alt="polish-flag" />
          ) : (
            <img src={enFlag} alt="uk-flag" />
          )}
        </button>
      </span>
    </nav>
  );
};
