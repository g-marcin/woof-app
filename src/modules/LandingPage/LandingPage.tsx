import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import dogIcon from '@assets/shield-dog-solid.svg';

export const LandingPage: FC = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-4 items-center content-center'>
            <h1 className='pt-5'>{t('headers.welcome')}</h1>
            <img src={dogIcon} className='bg-typography-primary rounded-full w-50 h-50 p-5 m-10 border-2 border-secondary'/>
            <Link to="/home" className="primary">
                {t('buttons.start')}
            </Link>
            <Link to="/readme" className="primary">
                {t('buttons.readme')}
            </Link>
        </div>
    );
};
