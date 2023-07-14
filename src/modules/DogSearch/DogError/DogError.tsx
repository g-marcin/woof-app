import { FC } from "react";
import { useTranslation } from "react-i18next";
import dogIcon from "../../../assets/shield-dog-solid.svg";
import styles from "./dogError.module.css";

export const DogError: FC = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["wrapper"]}>
      <img src={dogIcon} alt="search" className={styles.icon} />
      <h1>{t("headers.unfortunately")}</h1>
      <p>
        {t("errors.noBreed1")}
        <br />
        {t("errors.noBreed2")}
      </p>
    </div>
  );
};
