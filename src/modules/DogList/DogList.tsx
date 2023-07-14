import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDogList } from "../../hooks/useDogList";
import styles from "./dogList.module.css";
const DogList: FC = () => {
  const { dogEntries } = useDogList();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className={styles["list-wrapper"]}>
      <h1 className={styles["list-header"]}>{t("headers.dogList")}</h1>
      {dogEntries.map(([dog, variants]) => {
        return (
          <div className={styles["list-item"]}>
            <Link to={`/search/${dog}`} className={styles["link"]}>
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
  );
};

export default DogList;
