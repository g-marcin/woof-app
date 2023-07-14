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
            <Link
              to={`search/${dog}`}
              onClick={() => listButtonHandler(dog)}
              className={styles["list-item"]}
            >
              {dog}
              <div className={styles["tags-wrapper"]}>
                {variants.map((variant) => {
                  return <span className={styles.tag}>{variant}</span>;
                })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
