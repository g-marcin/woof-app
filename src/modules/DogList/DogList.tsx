import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDogList } from "../../hooks/useDogList";
import styles from "./dogList.module.css";

type DogListProps = {
  exampleProp?: "";
};

export const DogList: FC<DogListProps> = () => {
  const { dogEntries, isLoading } = useDogList();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const listButtonHandler = (queryParam: string) => {
    navigate(`search/${queryParam}`);
  };

  return (
    <div className={styles["main-wrapper"]}>
      <h1 className={styles["list-header"]}>{t("headers.dogList")}</h1>
      <div className={styles["list-wrapper"]}>
        {dogEntries.map(([dog, variants]) => {
          return (
            <div className={styles["list-item"]}>
              <Link to={`search/${dog}`} onClick={() => listButtonHandler(dog)}>
                {dog}
              </Link>
              <div className={styles["tags-wrapper"]}>
                {variants.map((variant) => {
                  return (
                    <button
                      onClick={() => {
                        navigate(`/search/${dog}/${variant}`);
                      }}
                      className={styles.tag}
                    >
                      {variant}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
