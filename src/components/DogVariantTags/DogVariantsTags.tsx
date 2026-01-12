import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLinkState } from '../../types';
import { DogVariantLink } from '../../modules/DogSearch/DogDetails/DogVariantLink';

export const TAG_CLASS = 'flex items-center bg-secondary rounded-xl px-1 h-[13px] hover:opacity-80';
export const TAG_ACTIVE_CLASS = 'flex items-center bg-link-active rounded-xl px-1 h-[13px]';

export interface DogVariantsTagsProps {
    dogVariants: string[];
    breedName: string;
    navLinkState: (state: NavLinkState) => string;
}

export const DogVariantsTags: FC<DogVariantsTagsProps> = ({ dogVariants, breedName, navLinkState }) => {
    const { t } = useTranslation();

    return (
        <div className="flex flex-wrap content-center gap-0.5">
            {dogVariants.length === 0 && (
                <p className={`${TAG_CLASS} typography-secondary`}>
                    {t('content.noVariants')}
                </p>
            )}
            {dogVariants.map((dogVariant) => (
                <DogVariantLink
                    key={dogVariant}
                    variant={dogVariant}
                    breedName={breedName}
                    navLinkState={navLinkState}
                />
            ))}
        </div>
    );
};

