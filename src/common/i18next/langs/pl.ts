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
    router: `Użyłem react router do poruszania się pomiędzy stronami. Nawigacja jest obsłużona z pomocą komponentów <Link> i <NavLink> oraz hooka useNavigate(). `,
    customHooks1: `Każda strona z danymi używa custom-hooka do pobrania ich po wejściu na daną stronę.`,
    customHooks2: `
np hook useDogList pobiera dane o rasach i podrasach. Następnie hook użyty jest w komponencie dogList.
    `,
    axios: `Użyłem http-clienta żeby łatwiej wysyłać rządania do API oraz umożliwić zmianę opcji rządań(np. nagłówków) w przyszłości.`,
    i18next: `Dodałem tłumaczenia przez biblotekę i18-next żeby pokazać że kojarzę temat internacjonalizacji.`,
    svgIcons: `Użyłem ikon w formacie svg pobranych ze strony font-awesome.`,
    formApi: `Użyłem html tagu form żeby w prosty sposób umożliwić wysyłanie submitu po kliknęciu ENTER.`,
    inputValidation: `Dodałem prostą validację do imputu za pomocą atrybutu required.`,
    cssModules: `Użyłem css modules żeby rozdzielić style do oddzielnych plików co zapewnia enkapsulację styli.`,
    cssVariables: `Użyłem zmiennych css  żeby w prosty sposób można było edytować kolory aplikacji.`,
    darkMode: `Użyłem zmiennych css do zaimplementowania podstawowej funkcjonalności dark theme.`,
    lazyLoading: `Użyłem lazy loading importu żeby zmniejszyć ilość danych potrzebnych do załadowania strony`,
    inputAutofocus: `Wykorzystałem wbudowany attrybut autofocus na htmlowym tagu input `,
    responsiveDesign: `Aplikacja jest responsywna. Można używać na desktopie, tablecie i telefonie`,
  },
} as const;
