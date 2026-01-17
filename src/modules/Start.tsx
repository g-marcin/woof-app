import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldDogSolid } from '@assets/svg/ShieldDogSolid';

export const Start: FC = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-4 items-center content-center'>
            <h1 className='pt-5'>{t('headers.welcome')}</h1>
            <ShieldDogSolid className='bg-typography-primary start-shield rounded-full w-50 h-50 p-5 m-10 border-2 border-secondary'/>
            <button className="primary start-button">
                <Link to="/listing">
                    {t('buttons.start')}
                </Link>
            </button>
            <button className="primary start-button">
                <Link to="/readme">
                    {t('buttons.readme')}
                </Link>
            </button>
        </div>
    );
};
