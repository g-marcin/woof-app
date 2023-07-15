import { FC, useEffect, useState } from "react";
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
  const [isDark, setIsDark] = useState(window.localStorage.getItem("theme") === "dark");
  const navLinkState = ({ isActive }: NavLinkState) => (isActive ? styles.active : "");
  const [language, setLanguage] = useState(window.localStorage.getItem("lang") === "en");
  const onFlagClick = () => {
    i18n
      .changeLanguage(`${language ? "pl" : "en"}`)
      .then(() => {
        setLanguage(() => !language);
        window.localStorage.setItem("lang", language ? "pl" : "en");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    document
      .getElementsByTagName("html")[0]
      .setAttribute("data-theme", window.localStorage.getItem("theme") || "dark");
  }, []);
  const onBulbClick = () => {
    const currentTheme = isDark;
    const newTheme = !currentTheme;
    window.localStorage.setItem("theme", newTheme ? "dark" : "light");
    setIsDark(newTheme);
    document
      .getElementsByTagName("html")[0]
      ?.setAttribute("data-theme", `${newTheme ? "dark" : "light"}`);
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
            <img src={bulbSolid} alt="bulb-off" />
          ) : (
            <img src={bulbRegular} alt="bulb-on" />
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
