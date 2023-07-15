import { FC } from "react";
import { useTranslation } from "react-i18next";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDogDetails, useDogVariants } from "../../../hooks";
import { NavLinkState } from "../../../types";
import { DogError } from "../DogError";
import styles from "./dogDetails.module.css";

export const DogDetails: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { breedName, variant } = useParams();
  const { dogDetails, isError } = useDogDetails(breedName, variant);
  const { dogVariants } = useDogVariants(breedName || "");
  if (!breedName) {
    return;
  }

  const capitalizeFirstLetter = (word: string) => {
    return word?.charAt(0).toLocaleUpperCase() + word?.slice(1);
  };

  const navLinkState = ({ isActive }: NavLinkState) =>
    isActive ? styles["tag-active"] : styles["tag"];

  return (
    <>
      {isError ? (
        <DogError />
      ) : (
        <div className={styles["main-wrapper"]}>
          <div className={styles["image-wrapper"]}>
            <img
              src={`${dogDetails.imageSrc}`}
              alt="dog-image"
              className={styles["details-avatar"]}
              onClick={() => navigate(0)}
            />
            <div className={styles["avatar-description"]}>{t("buttons.clickMe")}</div>
          </div>
          <div className={styles["description-wrapper"]}>
            <h1>{capitalizeFirstLetter(breedName)}:</h1>
            <p>{t("content.dogDescription1")}</p>
            <p>{t("content.dogDescription2")}</p>
          </div>
          <h1>
            {capitalizeFirstLetter(breedName)} {t("headers.variants")}
          </h1>
          <div className={styles["tags-wrapper"]}>
            {dogVariants.length === 0 && (
              <p className={styles["tag"]}>{t("content.noVariants")}</p>
            )}
            {dogVariants.map((dogVariant) => {
              return (
                <NavLink
                  onClick={(e) => {
                    const target = e.target as Element;
                    if (target.innerHTML === variant) {
                      e.preventDefault();
                      navigate(`/search/${breedName}`);
                    }
                  }}
                  to={`/search/${breedName}/${dogVariant}`}
                  className={navLinkState}
                >
                  {dogVariant}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
