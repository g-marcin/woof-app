import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./langs/en";
import { pl } from "./langs/pl";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      pl: {
        translation: pl,
      },
      en: {
        translation: en,
      },
    },
    lng: window.localStorage.getItem("lang") || "pl",
    fallbackLng: "pl",
  })
  .then(() => null)
  .catch((error) => console.log(error));

export default i18n;
