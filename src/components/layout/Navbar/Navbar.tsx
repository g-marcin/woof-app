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
  const navLinkState = ({ isActive, isPending }: NavLinkState) =>
    isPending ? styles.link : isActive ? styles.active : "";

  const [language, setLanguage] = useState(window.localStorage.getItem("lang") === "en");
  // true - english ; false - polish

  const onFlagClick = () => {
    const _ = i18n.changeLanguage(`${language ? "pl" : "en"}`);
    setLanguage(!language);

    window.localStorage.setItem("lang", language ? "pl" : "en");
  };

  return (
    <>
      <nav className={`${styles.nav}`}>
        <span className={styles["group"]}>
          <NavLink to="/home" className={navLinkState}>
            <img src={dogIcon} alt="search" className={styles.icon} />
          </NavLink>
          <NavLink to="/search" className={navLinkState}>
            <img src={searchIcon} alt="search" className={styles.icon} />
          </NavLink>
        </span>
        <span className={styles["group"]}>
          <button onClick={onFlagClick} className={styles["button-language"]}>
            {language ? <img src={plFlag} alt="" /> : <img src={enFlag} alt="" />}
          </button>
        </span>
      </nav>
    </>
  );
};
