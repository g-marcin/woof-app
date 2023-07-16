import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import dogIcon from '../../../assets/shield-dog-solid.svg';
import styles from './dogIntro.module.css';

const DogIntro: FC = () => {
    const { t } = useTranslation();
    return (
        <div className={styles['wrapper']}>
            <img src={dogIcon} alt="search" className={styles.icon} />
            <p>
                {t('content.intro1')}
                <br />
                {t('content.intro2')}
            </p>
        </div>
    );
};
export default DogIntro;
