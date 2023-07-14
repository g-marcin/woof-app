import { FC } from "react";
import { RefreshCw } from "react-feather";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDogDetails } from "../../../hooks";
import { useDogBreeds } from "../../../hooks/useDogBreeds";
import { DogError } from "../DogError";
import styles from "./dogDetails.module.css";

type ComponentNameProps = {
  exampleProp?: "";
};

export const DogDetails: FC<ComponentNameProps> = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { id: breedName, variant } = useParams();
  const { dogDetails, isLoading, isError } = useDogDetails(
    breedName || "",
    variant || ""
  );
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

  const navLinkState = ({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) => (isPending ? styles["tag"] : isActive ? styles["tag-active"] : styles["tag"]);

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
            {capitalizeFirstLetter(breedName)} {t("headers.variants")}{" "}
            <button
              onClick={() => {
                variant && navigate(-1);
              }}
            >
              <RefreshCw size={12} />
            </button>
          </h1>
          <p className={styles["tags-wrapper"]}>
            {dogBreeds.length === 0 && (
              <p className={styles["tag"]}>{t("content.noVariants")}</p>
            )}

            {dogBreeds.map((variant) => {
              return (
                <>
                  <NavLink
                    to={`/search/${breedName}/${variant}`}
                    className={navLinkState}
                  >
                    {variant}
                  </NavLink>
                </>
              );
            })}
          </p>
        </div>
      )}
    </>
  );
};
