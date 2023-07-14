import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./searchbar.module.css";

export const Searchbar: FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onSearch = () => {
    if (searchQuery) {
      navigate(`${searchQuery}`.toLocaleLowerCase().trim());
    }
  };
  return (
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
  );
};
