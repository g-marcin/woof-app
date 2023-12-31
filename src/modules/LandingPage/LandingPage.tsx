import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import dogIcon from '../../assets/shield-dog-solid.svg';
import styles from './landingPage.module.css';

export const LandingPage: FC = () => {
    const { t } = useTranslation();

    return (
        <div className={styles['wrapper']}>
            <h1 className={styles['header']}>{t('headers.welcome')}</h1>
            <img src={dogIcon} alt="" className={styles['icon']} />
            <div className={styles['logo-text']}>Woof-app</div>
            <Link to="/home" className="primary">
                {t('buttons.start')}
            </Link>
            <Link to="/readme" className="primary">
                {t('buttons.readme')}
            </Link>
        </div>
    );
};
