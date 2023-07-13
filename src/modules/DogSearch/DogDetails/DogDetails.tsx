import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useDogDetails } from "../../../hooks";
import { DogError } from "../DogError";
import styles from "./dogDetails.module.css";

type ComponentNameProps = {
  exampleProp?: "";
};

export const DogDetails: FC<ComponentNameProps> = () => {
  const { t, i18n } = useTranslation();
  const { id: breedName } = useParams();
  const navigate = useNavigate();
  const { dogDetails, isLoading, isError } = useDogDetails(breedName || "");
  if (!breedName) {
    return;
  }

  return (
    <>
      {isError ? (
        <DogError />
      ) : (
        <div className={styles["main-wrapper"]}>
          <div className={styles["wrapper"]}>
            <img
              src={`${dogDetails.imageSrc}`}
              alt="dog-image"
              className={styles["details-avatar"]}
              onClick={() => location.reload()}
            />
            <div className={styles["avatar-description"]}>{t("buttons.clickMe")}</div>
          </div>
          <div className={styles["details-description"]}>
            <h1>{breedName?.charAt(0).toLocaleUpperCase() + breedName?.slice(1)}</h1>
            <p>{t("content.dogDescription1")}</p>
            <p>{t("content.dogDescription2")}</p>
          </div>
        </div>
      )}
    </>
  );
};
