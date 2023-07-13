import { FC, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styles from "./dogSearch.module.css";

type DogSearchProps = {
  exampleProp?: "";
};

export const DogSearch: FC<DogSearchProps> = ({ exampleProp }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const onSearch = () => {
    navigate(`${searchQuery}`);
  };

  return (
    <div className={styles["main-wrapper"]}>
      <h1 className={styles["search-header"]}>Szukaj a znajdziesz </h1>
      <div className={styles["searchbar"]}>
        <div className={styles["input-wrapper"]}>
          <input
            type="text"
            className={styles["search-input"]}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <div className={styles["input-label"]}>Wpisz rasę, której szukasz</div>
        </div>
        <button className={styles["button-primary"]} onClick={onSearch}>
          Szukaj
        </button>
      </div>
      <Outlet />
    </div>
  );
};
