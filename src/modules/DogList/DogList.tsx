import { FC } from "react";
import backup from "../../mocks/backup.json";
import styles from "./dogList.module.css";

type DogListProps = {
  exampleProp?: "";
};

export const DogList: FC<DogListProps> = ({ exampleProp }) => {
  const listButtonHandler = () => null;

  return (
    <div className={styles["main-wrapper"]}>
      <h1 className={styles["list-header"]}>Lista ras:</h1>
      <div className={styles["list-wrapper"]}>
        {Object.keys(backup.message).map((dog) => {
          return <button onClick={listButtonHandler}>{dog}</button>;
        })}
      </div>
    </div>
  );
};
