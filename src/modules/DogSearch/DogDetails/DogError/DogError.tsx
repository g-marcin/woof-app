import { FC } from "react";
import dogIcon from "../../../../assets/dog-solid.svg";
import styles from "./dogError.module.css";

type DogErrorProps = {
  exampleProp?: "";
};

export const DogError: FC<DogErrorProps> = ({ exampleProp }) => {
  return (
    <div className={styles["wrapper"]}>
      <img src={dogIcon} alt="search" className={styles.icon} />
      <h1>Niestety</h1>
      <p>
        Ajajaj! Tej rasy nie ma jeszcze <br /> w naszej bazie. Poszukaj innej.
      </p>
    </div>
  );
};
