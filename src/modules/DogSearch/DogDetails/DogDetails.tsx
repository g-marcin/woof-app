import { FC } from "react";
import { RefreshCw } from "react-feather";
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
              onClick={() => location.reload()}
            />
            <div className={styles["avatar-description"]}>{t("buttons.clickMe")}</div>
          </div>
          <div className={styles["description-wrapper"]}>
            <h1>{capitalizeFirstLetter(breedName)}</h1>
            <p>{t("content.dogDescription1")}</p>
            <p>{t("content.dogDescription2")}</p>
          </div>
          <h1>
            {capitalizeFirstLetter(breedName)} {t("headers.variants")}{" "}
            <button
              onClick={() => {
                variant && navigate(`/search/${breedName}`);
              }}
            >
              <RefreshCw size={12} />
            </button>
          </h1>
          <div className={styles["tags-wrapper"]}>
            {dogVariants.length === 0 && (
              <p className={styles["tag"]}>{t("content.noVariants")}</p>
            )}
            {dogVariants.map((variant) => {
              return (
                <NavLink to={`/search/${breedName}/${variant}`} className={navLinkState}>
                  {variant}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
