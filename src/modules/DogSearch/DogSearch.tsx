import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./dogSearch.module.css";

type DogSearchProps = {
  exampleProp?: "";
};

export const DogSearch: FC<DogSearchProps> = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onSearch = () => {
    if (!searchQuery) {
      return;
    }
    navigate(`${searchQuery}`.toLocaleLowerCase());
  };

  return (
    <div className={styles["main-wrapper"]}>
      <h1 className={styles["search-header"]}>{t("headers.keepSearching")}</h1>
      <form className={styles["searchbar"]}>
        <div className={styles["input-wrapper"]}>
          <input
            type="text"
            className={styles["search-input"]}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            autoFocus
            required
          />
          <div className={styles["input-label"]}>{t("labels.typeDog")}</div>
        </div>
        <button type="submit" className="primary" onClick={onSearch}>
          {t("buttons.search")}
        </button>
      </form>
      <Outlet />
    </div>
  );
};
