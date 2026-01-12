import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ShieldDogSolid } from '@assets/svg/ShieldDogSolid';

export const Start: FC = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-4 items-center content-center'>
            <h1 className='pt-5'>{t('headers.welcome')}</h1>
            <ShieldDogSolid className='bg-typography-primary rounded-full w-50 h-50 p-5 m-10 border-2 border-secondary'/>
            <Link to="/listing" className="primary">
                {t('buttons.start')}
            </Link>
            <Link to="/readme" className="primary">
                {t('buttons.readme')}
            </Link>
        </div>
    );
};
