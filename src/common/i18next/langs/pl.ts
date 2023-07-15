export const pl = {
  headers: {
    dogList: "Lista ras",
    keepSearching: "Szukaj a znajdziesz",
    unfortunately: "Niestety",
    variants: "- rodzaje",
    welcome: "Cześć!",
    readme: "PL",
  },
  content: {
    dogDescription1:
      "Ten pies to wierny i przyjacielski czworonóg, który świetnie czuję się w roli rodzinnego towarzysza. Dobrze dogaduje się z dziećmi, uwielbia pieszczoty i wspólne zabawy.Jest łatwy w prowadzeniu, choć bywa uparty. Sprawdzi się zarówno w małym mieszkaniu jak i w domu z ogrodem.",

    dogDescription2:
      "Wysokość w kłębie 30-35cm, masa ciała 22-25kg. Sierść krótka, delikatna, lśniąca,umaszczenie płowe, pręgowane lub łaciate. Charakter czujny, śmiały, oddany,odważny, łagodny, czasem uparty. W zależności od dnia pokazuje różne obliczaswojej natury...",
    intro1: "Tu wyświetlimy informacje",
    intro2: "O interesującym Cię pupilu.",
    noVariants: "Brak rodzajów do wyświetlenia",
  },
  buttons: {
    search: "Szukaj",
    clickMe: "Naciśnij mnie!",
    start: "Dalej",
    readme: "Readme",
  },
  labels: {
    typeDog: "Wpisz rasę, której szukasz",
  },
  errors: {
    noBreed1: "Ajajaj! Tej rasy nie ma jeszcze",
    noBreed2: " w naszej bazie. Poszukaj innej",
  },
  readme: {
    router1: `Zastosowałem react-router do zmiany stron, strony z danymi pobierają je za pomocą
        custom-hooków. `,
    router2: `np useDogList hook pobiera liste ras i pod-ras psów. Następnie dane
        wyświetlane są w komponencie DogList.`,
    axios: `Użyłem http-clienta żeby łatwiej wysyłać rządania do API oraz umożliwić zmianę opcji rządań(np. nagłówków) w przyszłości`,
    i18next: `Dodałem tłumaczenia przez biblotekę i18-next żeby pokazać że kojarzę temat internacjonalizacji`,
    svgIcons: `Użyłem ikon w formacie svg pobranych ze strony font-awesome`,
    formApi: `Użyłem html tagu form żeby w prosty sposób umożliwić wysyłanie submitu po kliknęciu ENTER`,
    inputValidation: `Dodałem prostą validację do imputu za pomocą atrybutu required`,
    cssModules: `Użyłem css modules żeby rozdzielić style do oddzielnych plików co zapewnia enkapsulację styli`,
    cssVariables: `Użyłem zmiennych css  żeby w prosty sposób można było edytować kolory aplikacji`,
  },
} as const;
