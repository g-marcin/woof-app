import { FC } from "react";
import { DogDetails } from "./DogDetails/DogDetails";
import styles from "./dogSearch.module.css";

type DogSearchProps = {
  exampleProp?: "";
};

export const DogSearch: FC<DogSearchProps> = ({ exampleProp }) => {
  return (
    <div className={styles["main-wrapper"]}>
      <h1 className={styles["search-header"]}>Szukaj a znajdziesz </h1>
      <div className={styles["searchbar"]}>
        <div className={styles["input-wrapper"]}>
          <input type="text" className={styles["search-input"]} />
          <div className={styles["input-label"]}>Wpisz rasę, której szukasz</div>
        </div>
        <button className={styles["button-primary"]}>Szukaj</button>
      </div>

      <DogDetails />
    </div>
  );
};
