import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { ShieldDogSolid } from '@assets/svg/ShieldDogSolid'

export const DogError: FC = () => {
    const { t } = useTranslation()
    return (
        <div className="flex flex-col gap-4 items-center">
            <ShieldDogSolid className="bg-[color:var(--typography-primary)] rounded-full w-[85px] h-[85px] p-[70px] my-[35px] border-4 border-[color:var(--secondary)]" />
            <h1>{t('headers.unfortunately')}</h1>
            <p>
                {t('errors.noBreed1')}
                <br />
                {t('errors.noBreed2')}
            </p>
        </div>
    )
}
