import { FC } from "react";
import { useTranslation } from "react-i18next";
import enFlag from "../../assets/en.svg";
import plFlag from "../../assets/pl.svg";
import styles from "./readme.module.css";

const Readme: FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles["wrapper"]}>
      <span className={styles.header}>
        <h1>{t("headers.readme")}</h1>
        {t("headers.readme") == "PL" ? (
          <img src={plFlag} alt="" />
        ) : (
          <img src={enFlag} alt="" />
        )}{" "}
        <img src="" alt="" />
      </span>
      <h1>react-router & custom hooks:</h1>
      <p>
        {t("readme.router1")}
        <br />
        {t("readme.router2")}
      </p>{" "}
      <h1>Axios:</h1>
      <p>{t("readme.axios")}</p>
      <h1>i18-next:</h1>
      <p>{t("readme.i18next")}</p>
      <h1>svg-icons:</h1>
      <p>{t("readme.svgIcons")}</p>
      <h1>form-api:</h1>
      <p>{t("readme.formApi")}</p>
      <h1>input-validation:</h1>
      <p>{t("readme.inputValidation")}</p>
      <h1>css-modules:</h1>
      <p>{t("readme.cssModules")}</p>
      <h1>css-variables:</h1>
      <p>{t("readme.cssVariables")}</p>
    </div>
  );
};

export default Readme;
