import { FC } from 'react'
import { DogVariantLink } from '../../modules/DogDetails/DogVariantLink'

export interface DogVariantsTagsProps {
    dogVariants: string[]
    breedName: string
}

export const DogVariantsTags: FC<DogVariantsTagsProps> = ({
    dogVariants,
    breedName,
}) => {
    return (
        <div className="flex flex-wrap content-center gap-1.5">
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
