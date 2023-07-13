import { FC } from "react";
import { useTranslation } from "react-i18next";
import dogIcon from "../../../../assets/dog-solid.svg";
import styles from "./dogError.module.css";

type DogErrorProps = {
  exampleProp?: "";
};

export const DogError: FC<DogErrorProps> = () => {
  const { t } = useTranslation();
  return (
    <div className={styles["wrapper"]}>
      <img src={dogIcon} alt="search" className={styles.icon} />
      <h1>{t("headers.unfortunately")}</h1>
      <p>{t("errors.noBreed")}</p>
    </div>
  );
};
