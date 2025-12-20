import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { ModeType } from '../DogDetails/constants';
import styles from './modeNavigation.module.css';

export const ModeNavigation: FC = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentMode = (searchParams.get('mode') || ModeType.DETAILS) as ModeType;

    const handleModeChange = (mode: ModeType) => {
        const newParams = new URLSearchParams(searchParams);
        if (mode === ModeType.DETAILS) {
            newParams.delete('mode');
        } else {
            newParams.set('mode', mode);
        }
        setSearchParams(newParams, { replace: true });
    };

    return (
        <div className={styles['mode-navigation']}>
            <button
                onClick={() => handleModeChange(ModeType.DETAILS)}
                className={`primary ${styles['mode-button']}  ${
                    currentMode === ModeType.DETAILS ? `${styles['active']} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewDefault')}
            </button>
            <button
                onClick={() => handleModeChange(ModeType.GALLERY)}
                className={`primary ${styles['mode-button']} ${
                    currentMode === ModeType.GALLERY ? `${styles['active']} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewList')}
            </button>
            <button
                onClick={() => handleModeChange(ModeType.RANDOM)}
                className={`primary ${styles['mode-button']}  typography-bold ${
                    currentMode === ModeType.RANDOM ? `${styles['active']} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewRandom')}
            </button>
        </div>
    );
};

