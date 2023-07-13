import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import backup from "../../mocks/backup.json";
import styles from "./dogList.module.css";

type DogListProps = {
  exampleProp?: "";
};

export const DogList: FC<DogListProps> = ({ exampleProp }) => {
  const navigate = useNavigate();
  const listButtonHandler = (queryParam: string) => {
    navigate(`search/${queryParam}`);
  };

  return (
    <div className={styles["main-wrapper"]}>
      <h1 className={styles["list-header"]}>Lista ras:</h1>
      <div className={styles["list-wrapper"]}>
        {Object.keys(backup.message).map((dog) => {
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