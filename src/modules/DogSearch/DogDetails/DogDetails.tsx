import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { useDogDetails } from "../../../hooks";
import { useDogBreeds } from "../../../hooks/useDogBreeds";
import { DogError } from "../DogError";
import styles from "./dogDetails.module.css";

type ComponentNameProps = {
  exampleProp?: "";
};

export const DogDetails: FC<ComponentNameProps> = () => {
  const { t } = useTranslation();
  const { id: breedName } = useParams();
  const { dogDetails, isLoading, isError } = useDogDetails(breedName || "");
  const {
    dogBreeds,
    isLoading: isBreedsLoading,
    isError: isBreedsError,
  } = useDogBreeds(breedName || "");
  if (!breedName) {
    return;
  }

  const capitalizeFirstLetter = (word: string) => {
    return word?.charAt(0).toLocaleUpperCase() + word?.slice(1);
  };

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
            <h1>{capitalizeFirstLetter(breedName)}</h1>
            <p>{t("content.dogDescription1")}</p>
            <p>{t("content.dogDescription2")}</p>
          </div>
          <h1>
            {capitalizeFirstLetter(breedName)} {t("headers.variants")}
          </h1>
          <p className={styles["tags-wrapper"]}>
            {dogBreeds.length === 0 && <p>No dog variants available</p>}
            {dogBreeds.map((breed) => {
              return <span className={styles["tag"]}>{breed}</span>;
            })}
          </p>
        </div>
      )}
    </>
  );
};
