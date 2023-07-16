export const en = {
    headers: {
        dogList: 'Breed list:',
        keepSearching: 'Keep looking!',
        unfortunately: 'Unfortunately',
        variants: '- variants:',
        welcome: 'Welcome!',
        readme: 'EN',
    },
    content: {
        dogDescription1:
            ' This dog is a friendly quadruped that feels great as a family companion. He gets along well with children, loves caresses and having fun together. It is easy to drive, although the road stubborn. Check yourself both in a small apartment and in a house with a garden.',

        dogDescription2:
            'Height at the withers 30-35 cm, body weight 22-25 kg. The coat is short, smooth, shiny, fawn, brindle or spotted. Alert character, bold, cautious, sensitive, sometimes stubborn. Depending on the day, they define different faces of their nature...',
        intro1: 'Here we will display the info',
        intro2: 'about the pet chosen by you.',
        noVariants: 'No dog variants available',
    },
    buttons: {
        search: 'Search',
        clickMe: 'Click me!',
        start: 'Start',
        readme: 'Readme',
    },
    labels: {
        typeDog: 'Type requested breed...',
    },
    errors: {
        noBreed1: 'Oh no! This race is not ',
        noBreed2: 'available yet. Keep looking!',
    },
    readme: {
        router: `I used react router to enable navigating between diferent pages. Navigation is done with <Navlink>, <Link> components and useNavigate() hook.`,
        customHooks1: `Each page with content uses custom hook and request required data.`,
        customHooks2: `
eg. useDogList hook gets breeds & subBreeds list and pass to DogList component.
    `,
        axios: `Axios http-client was used for http requests as it will be more easy to customize request options in the future and improve the app.`,
        i18next: `I added i18 next translation to show i am aware of this library and importance of internationalization process.`,
        svgIcons: `I used svg icons manually downloaded from font-awesome website`,
        formApi: `I used form tag to enable submit on ENTER click.`,
        inputValidation: `I added simple built-in validation with input required attribute.`,
        cssModules: `I used separate css-module for each component to support style encapsulation.`,
        cssVariables: `I used css-variables to collect colors in one place. They may be changed easily.`,
        darkMode: `I used css-variables to implement simple dark mode feature.`,
        lazyLoading: `I used lazy loadning to load each page which reduces amount of data required to be download on page load`,
        inputAutofocus: `I added built in autofocus attribute to input tag `,
        responsiveDesign: `App is fully responsive. Ready to be displayed on desktop, tablet and mobile devices`,
    },
} as const;
