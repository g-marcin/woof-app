import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import bulbRegular from "../../../assets/bulb-regular.svg";
import bulbSolid from "../../../assets/bulb-solid.svg";
import dogIcon from "../../../assets/dog-solid.svg";
import enFlag from "../../../assets/en.svg";
import infoIcon from "../../../assets/info.svg";
import plFlag from "../../../assets/pl.svg";
import searchIcon from "../../../assets/search.svg";
import { NavLinkState } from "../../../types";
import styles from "./navbar.module.css";

export const Navbar: FC = () => {
  const { i18n } = useTranslation();
  const [isDark, setIsDark] = useState(false);
  const navLinkState = ({ isActive }: NavLinkState) => (isActive ? styles.active : "");
  const getUserLanguage = () => {
    return window.localStorage.getItem("lang");
  };
  const [language, setLanguage] = useState(getUserLanguage() === "en");
  const onFlagClick = () => {
    i18n
      .changeLanguage(`${language ? "pl" : "en"}`)
      .then(() => {
        setLanguage(() => !language);
        window.localStorage.setItem("lang", language ? "pl" : "en");
      })
      .catch((error) => console.log(error));
  };
  const onBulbClick = () => {
    const currentTheme = isDark;
    const newTheme = !currentTheme;
    setIsDark(newTheme);
    window.localStorage.setItem("theme", newTheme ? "light" : "dark");
    document
      .getElementsByTagName("body")[0]
      .setAttribute("class", `${newTheme ? "dark" : ""}`);
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
        <button onClick={onBulbClick}>
          {isDark ? (
            <img src={bulbRegular} alt="bulb-off" />
          ) : (
            <img src={bulbSolid} alt="bulb-on" />
          )}
        </button>
        <NavLink to="/readme" className={navLinkState}>
          <img src={infoIcon} alt="info-icon" className={styles.icon} />
        </NavLink>
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
