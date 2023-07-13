import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDogList } from "../../hooks/useDogList";
import styles from "./dogList.module.css";

type DogListProps = {
  exampleProp?: "";
};

export const DogList: FC<DogListProps> = () => {
  const { dogList, isLoading } = useDogList();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const listButtonHandler = (queryParam: string) => {
    navigate(`search/${queryParam}`);
  };

  return (
    <div className={styles["main-wrapper"]}>
      <h1 className={styles["list-header"]}>{t("headers.dogList")}</h1>
      <div className={styles["list-wrapper"]}>
        {dogList.map((dog) => {
          return (
            <Link
              to={`search/${dog}`}
              onClick={() => listButtonHandler(dog)}
              className={styles["list-item"]}
            >
              {dog}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
