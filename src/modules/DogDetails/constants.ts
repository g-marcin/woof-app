export const ModeType = {
    DETAILS: 'details',
    GALLERY: 'gallery',
    RANDOM: 'random',
} as const;

export type ModeType = typeof ModeType[keyof typeof ModeType];

