import { FC } from "react";
import styles from "./readme.module.css";

const Readme: FC = () => {
  return (
    <div className={styles["wrapper"]}>
      <h1>PL:</h1>
      <h1>react-router & custom hooks:</h1>
      <p>
        Zastosowałem react-router do zmiany stron, strony z danymi pobierają je za pomocą
        custom-hooków np useDogList hook pobiera liste ras i pod-ras psów. Następnie dane
        wyświetlane są w komponencie DogList
      </p>

      <h1>Axios:</h1>
      <p>
        Użyłem <b>http-clienta</b> żeby łatwiej wysyłać rządania do API oraz umożliwić
        zmianę opcji rządań(np. nagłówków) w przyszłości
      </p>
      <h1>i18-next:</h1>
      <p>
        Dodałem tłumaczenia przez biblotekę i18-next żeby pokazać że kojarzę temat
        internacjonalizacji
      </p>
      <h1>svg-icons:</h1>
      <p>Użyłem ikon w formacie svg pobranych ze strony font-awesome</p>
      <h1>form-api:</h1>
      <p>
        Użyłem html tagu form żeby w prosty sposób umożliwić wysyłanie submitu po
        kliknęciu <b>ENTER</b>
      </p>
      <h1>input-validation:</h1>
      <p>
        Dodałem prostą validację do imputu za pomocą atrybutu <b>required</b>
      </p>
      <h1>css-modules:</h1>
      <p>
        Użyłem css modules żeby rozdzielić onentów do odzielnych plików co poprawia
        enkapsulację styli
      </p>
      <h1>css-variables:</h1>
      <p>
        Użyłem zmiennych css żeby w prosty sposób można było edytować kolory aplikacji
      </p>
    </div>
  );
};

export default Readme;
