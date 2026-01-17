import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FlagEn } from '@assets/svg/FlagEn';
import { FlagPl } from '@assets/svg/FlagPl';

const Readme: FC = () => {
    const { t } = useTranslation();

    return (
        <div className='flex flex-col gap-2 m-auto max-w-200 p-5'>
            <span className='flex gap-2 items-center m-auto p-10'>
                <h1>Readme: {t('headers.readme')}</h1>
                {t('headers.readme') == 'PL' ? <FlagPl /> : <FlagEn />}
            </span>

            <h1>About:</h1>
            <p>{t('readme.about')}</p>

            <h1>Tech Stack:</h1>
            <p>{t('readme.techStack')}</p>

            <h1>react-router:</h1>
            <p>{t('readme.router')}</p>

            <h1>custom hooks:</h1>
            <p>
                {t('readme.customHooks1')}
                <br />
                {t('readme.customHooks2')}
            </p>

            <h1>Axios:</h1>
            <p>{t('readme.axios')}</p>

            <h1>i18next:</h1>
            <p>{t('readme.i18next')}</p>

            <h1>svg-icons:</h1>
            <p>{t('readme.svgIcons')}</p>

            <h1>input-validation:</h1>
            <p>{t('readme.inputValidation')}</p>

            <h1>input autofocus:</h1>
            <p>{t('readme.inputAutofocus')}</p>

            <h1>css-modules:</h1>
            <p>{t('readme.cssModules')}</p>

            <h1>css-variables:</h1>
            <p>{t('readme.cssVariables')}</p>

            <h1>dark-mode:</h1>
            <p>{t('readme.darkMode')}</p>

            <h1>lazy-loading:</h1>
            <p>{t('readme.lazyLoading')}</p>
            <h1>responsive-design:</h1>
            <p>{t('readme.responsiveDesign')}</p>

            <h1>dog-api:</h1>
            <p>{t('readme.dogApi')}</p>

            <h1>image-resizer:</h1>
            <p>{t('readme.imageResizer')}</p>
        </div>
    );
};

export default Readme;
