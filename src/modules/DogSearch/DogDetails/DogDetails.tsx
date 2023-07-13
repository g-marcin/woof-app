import { FC } from "react";
import styles from "./dogDetails.module.css";

type ComponentNameProps = {
  exampleProp?: "";
};

export const DogDetails: FC<ComponentNameProps> = () => {
  return (
    <div className={styles["main-wrapper"]}>
      <img
        src="https://picsum.photos/200/200"
        alt="dog-image"
        className={styles["details-avatar"]}
      />

      <div className={styles["details-description"]}>
        <h1>Nazwa rasy</h1>
        <p>
          Ten pies to wierny i przyjacielski czworonóg, który świetnie czuję się w roli
          rodzinnego towarzysza. Dobrze dogaduje się z dziećmi, uwielbia pieszczoty i
          wspólne zabawy. Jest łatwy w prowadzeniu, choć bywa uparty. Sprawdzi się zarówno
          w małym mieszkaniu jak i w domu z ogrodem.
        </p>
        <p>
          Wysokość w kłębie 30-35cm, masa ciała 22-25kg. Sierść krótka, delikatna,
          lśniąca, umaszczenie płowe, pręgowane lub łaciate. Charakter czujny, śmiały,
          oddany, odważny, łagodny, czasem uparty. W zależności od dnia pokazuje różne
          oblicza swojej natury...
        </p>
      </div>
    </div>
  );
};
