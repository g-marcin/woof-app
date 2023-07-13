import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import dogIcon from "../../../assets/dog-solid.svg";
import enFlag from "../../../assets/en.svg";
import plFlag from "../../../assets/pl.svg";
import searchIcon from "../../../assets/search.svg";
import styles from "./navbar.module.css";

export const Navbar: FC = () => {
  const { t, i18n } = useTranslation();
  const navLinkState = ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => (isPending ? styles.link : isActive ? styles.active : "");

  const [language, setLanguage] = useState(window.localStorage.getItem("lang") === "en");

  const onFlagClick = () => {
    const i18 = i18n.changeLanguage(`${language ? "pl" : "en"}`);
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

        <button onClick={onFlagClick} className={styles["button-language"]}>
          {language ? <img src={plFlag} alt="" /> : <img src={enFlag} alt="" />}
        </button>
      </nav>
    </>
  );
};
