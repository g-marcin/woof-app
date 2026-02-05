import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { DogVariantLink } from '../../modules/DogDetails/DogVariantLink'
import { Tag } from '../Tag'

export interface DogVariantsTagsProps {
    dogVariants: string[]
    breedName: string
}

export const DogVariantsTags: FC<DogVariantsTagsProps> = ({
    dogVariants,
    breedName,
}) => {
    const { t } = useTranslation()

    return (
        <div className="flex flex-wrap content-center gap-1.5">
            {dogVariants.length === 0 && <Tag>{t('content.noVariants')}</Tag>}
            {dogVariants.map(dogVariant => (
                <DogVariantLink
                    key={dogVariant}
                    variant={dogVariant}
                    breedName={breedName}
                />
            ))}
        </div>
    )
}
