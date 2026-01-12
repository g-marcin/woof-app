import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { ModeType } from '../../DogDetails/constants';

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

    const baseButtonClass = "bg-transparent border-2 border-[color:var(--secondary)] rounded-lg cursor-pointer transition-all duration-300 no-underline text-[color:var(--typography-tertiary)] hover:bg-[color:var(--secondary)] max-md:px-4 max-md:py-2";
    const activeClass = "bg-[color:var(--secondary)] border-[color:var(--link-active)] shadow-[0_2px_8px_rgba(0,0,0,0.1)]";

    return (
        <div className="flex gap-2.5 justify-center py-5 border-b-2 border-[color:var(--secondary)] mb-5 max-md:flex-wrap max-md:gap-2">
            <button
                onClick={() => handleModeChange(ModeType.DETAILS)}
                className={`primary ${baseButtonClass} ${
                    currentMode === ModeType.DETAILS ? `${activeClass} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewDefault')}
            </button>
            <button
                onClick={() => handleModeChange(ModeType.GALLERY)}
                className={`primary ${baseButtonClass} ${
                    currentMode === ModeType.GALLERY ? `${activeClass} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewList')}
            </button>
            <button
                onClick={() => handleModeChange(ModeType.RANDOM)}
                className={`primary ${baseButtonClass} typography-bold ${
                    currentMode === ModeType.RANDOM ? `${activeClass} typography-primary` : 'typography-secondary'
                }`}
            >
                {t('buttons.viewRandom')}
            </button>
        </div>
    );
};

