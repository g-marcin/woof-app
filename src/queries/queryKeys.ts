export const queryKeys = {
    breeds: {
        all: () => ['breeds'],
        list: () => ['breeds', 'list'],
        variants: (breedName: string) => ['breeds', 'variants', breedName],
    },
    images: {
        all: () => ['images'],
        list: (breedName: string, breedVariant: string) => [
            'images',
            'list',
            breedName,
            breedVariant,
        ],
        random: (breedName: string, breedVariant: string) => [
            'images',
            'random',
            breedName,
            breedVariant,
        ],
    },
};
