import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import styles from './modeNavigation.module.css';

type Mode = 'default' | 'list' | 'random';

export const ModeNavigation: FC = () => {
    const { t } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentMode = (searchParams.get('mode') || 'default') as Mode;

    const handleModeChange = (mode: Mode) => {
        const newParams = new URLSearchParams(searchParams);
        if (mode === 'default') {
            newParams.delete('mode');
        } else {
            newParams.set('mode', mode);
        }
        setSearchParams(newParams, { replace: true });
    };

    return (
        <div className={styles['mode-navigation']}>
            <button
                onClick={() => handleModeChange('default')}
                className={`primary ${styles['mode-button']}  ${
                    currentMode === 'default' ? `${styles['active']} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewDefault')}
            </button>
            <button
                onClick={() => handleModeChange('list')}
                className={`primary ${styles['mode-button']} ${
                    currentMode === 'list' ? `${styles['active']} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewList')}
            </button>
            <button
                onClick={() => handleModeChange('random')}
                className={`primary ${styles['mode-button']}  typography-bold ${
                    currentMode === 'random' ? `${styles['active']} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewRandom')}
            </button>
        </div>
    );
};

