import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldDogSolid } from '@assets/svg/ShieldDogSolid';

const DogIntro: FC = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-4 items-center">
            <ShieldDogSolid className="bg-[color:var(--typography-primary)] rounded-full w-[90px] h-[90px] p-[70px] my-[35px] border-4 border-[color:var(--secondary)]" />
            <p>
                {t('content.intro1')}
                <br />
                {t('content.intro2')}
            </p>
        </div>
    );
};
export default DogIntro;
