import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLinkState } from '../../types';
import { DogVariantLink } from '../../modules/DogSearch/DogDetails/DogVariantLink';
import styles from './dogVariantTags.module.css';

export interface DogVariantsTagsProps {
    dogVariants: string[];
    breedName: string;
    navLinkState: (state: NavLinkState) => string;
}

export const DogVariantsTags: FC<DogVariantsTagsProps> = ({ dogVariants, breedName, navLinkState }) => {
    const { t } = useTranslation();

    return (
        <div className={styles['tags-wrapper']}>
            {dogVariants.length === 0 && (
                <p className={`${styles['tag']}  typography-secondary `}>
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

