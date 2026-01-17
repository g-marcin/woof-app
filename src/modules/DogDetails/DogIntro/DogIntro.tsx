import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldDogSolid } from '@assets/svg/ShieldDogSolid';

const DogIntro: FC = () => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col gap-4 items-center">
            <ShieldDogSolid className='bg-typography-primary rounded-full w-50 h-50 p-5 m-10 border-2 border-secondary'/>
            <p>
                {t('content.intro1')}
                <br />
                {t('content.intro2')}
            </p>
        </div>
    );
};
export default DogIntro;
