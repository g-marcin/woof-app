import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FlagEn } from '@assets/svg/FlagEn'
import { FlagPl } from '@assets/svg/FlagPl'

export const LanguageToggle: FC = () => {
    const { i18n } = useTranslation()
    const [language, setLanguage] = useState(
        window.localStorage.getItem('lang') === 'en'
    )
    const onFlagClick = () => {
        i18n.changeLanguage(`${language ? 'pl' : 'en'}`)
            .then(() => {
                setLanguage(() => !language)
                window.localStorage.setItem('lang', language ? 'pl' : 'en')
            })
            .catch(error => console.log(error))
    }

    return (
        <button onClick={onFlagClick}>
            {language ? <FlagPl /> : <FlagEn />}
        </button>
    )
}
