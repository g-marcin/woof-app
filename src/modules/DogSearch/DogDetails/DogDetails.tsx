import { FC } from "react";
import { useParams } from "react-router-dom";
import { useDogDetails } from "../../../hooks";
import { DogError } from "./DogError";
import styles from "./dogDetails.module.css";

type ComponentNameProps = {
  exampleProp?: "";
};

export const DogDetails: FC<ComponentNameProps> = () => {
  const { id: breedName } = useParams();
  const { dogDetails, isLoading, isError } = useDogDetails(breedName || "");
  if (!breedName) {
    return;
  }

  return (
    <>
      {isError ? (
        <DogError />
      ) : (
        <div className={styles["main-wrapper"]}>
          <img
            src={`${dogDetails.imageSrc}`}
            alt="dog-image"
            className={styles["details-avatar"]}
          />
          <div className={styles["details-description"]}>
            <h1>{breedName?.charAt(0).toLocaleUpperCase() + breedName?.slice(1)}</h1>
            <p>
              Ten pies to wierny i przyjacielski czworonóg, który świetnie czuję się w
              roli rodzinnego towarzysza. Dobrze dogaduje się z dziećmi, uwielbia
              pieszczoty i wspólne zabawy. Jest łatwy w prowadzeniu, choć bywa uparty.
              Sprawdzi się zarówno w małym mieszkaniu jak i w domu z ogrodem.
            </p>
            <p>
              Wysokość w kłębie 30-35cm, masa ciała 22-25kg. Sierść krótka, delikatna,
              lśniąca, umaszczenie płowe, pręgowane lub łaciate. Charakter czujny, śmiały,
              oddany, odważny, łagodny, czasem uparty. W zależności od dnia pokazuje różne
              oblicza swojej natury...
            </p>
          </div>
        </div>
      )}
    </>
  );
};
